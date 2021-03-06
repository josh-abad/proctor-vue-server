import { CourseGrades } from '@/types'
import { Router } from 'express'
import Course from '@/models/course'
import Exam from '@/models/exam'
import User from '@/models/user'
import ExamAttempt from '@/models/exam-attempt'
import slugify from 'slugify'
import { authenticate } from '@/utils/middleware'

const coursesRouter = Router()

coursesRouter.post(
  '/',
  authenticate('coordinator', 'admin'),
  async (req, res) => {
    const body = req.body

    const coordinator = await User.findById(body.coordinatorId)
    if (coordinator?.role !== 'coordinator') {
      res.status(401).send({
        error: 'invalid coordinator id'
      })
      return
    }

    const course = new Course({
      name: body.name,
      description: body.description,
      coordinator: coordinator._id,
      weeks: body.weeks,
      slug: slugify(body.name, {
        lower: true,
        strict: true
      })
    })

    coordinator.courses.push(course._id)
    await coordinator.save()

    const savedCourse = await course.save()
    res.json(await savedCourse.populate('coordinator').execPopulate())
  }
)

coursesRouter.get('/', async (_req, res) => {
  const courses = await Course.find({}).sort('name').populate('coordinator')
  res.json(courses)
})

coursesRouter.get('/:slug', async (req, res) => {
  const course = await Course.findOne({ slug: req.params.slug })
    .populate('coordinator')
    .populate('exams')
  if (course) {
    res.json(course)
  } else {
    res.status(404).end()
  }
})

coursesRouter.get(
  '/:slug/students',
  authenticate('coordinator', 'admin'),
  async (req, res) => {
    const course = await Course.findOne({ slug: req.params.slug })
    if (course) {
      const students = await User.find({
        active: true,
        _id: { $in: course.studentsEnrolled }
      }).populate('courses')
      res.json(students)
    } else {
      res.status(404).end()
    }
  }
)

coursesRouter.get('/:slug/progress/:user', async (req, res) => {
  const course = await Course.findOne({ slug: req.params.slug })

  if (!course) {
    res.status(404).end()
    return
  }

  const uniqueExamsTakenByUser = await ExamAttempt.distinct('exam', {
    exam: {
      $in: course.exams
    },
    user: req.params.user,
    score: { $gt: 0 }
  })

  const percentage =
    uniqueExamsTakenByUser.length === 0
      ? 0
      : Math.floor((uniqueExamsTakenByUser.length / course.exams.length) * 100)

  res.json({ percentage })
})

coursesRouter.get('/:courseSlug/exams/:examSlug', async (req, res) => {
  const course = await Course.findOne({ slug: req.params.courseSlug })
  if (course) {
    const exam = await Exam.findOne({
      slug: req.params.examSlug,
      course: course._id
    }).populate('course')

    if (exam) {
      res.json(exam)
    } else {
      res.sendStatus(404)
    }
  } else {
    res.sendStatus(404)
  }
})

coursesRouter.get(
  '/:id/attempts',
  authenticate('coordinator', 'admin'),
  async (req, res) => {
    const course = await Course.findById(req.params.id)
    if (!course) {
      res.sendStatus(404)
    } else {
      const attemptsInCourse = await ExamAttempt.find({
        exam: { $in: course.exams }
      }).populate({ path: 'exam user', populate: { path: 'course' } })
      res.json(attemptsInCourse)
    }
  }
)

coursesRouter.get(
  '/:slug/grades/:userId',
  authenticate('coordinator', 'admin'),
  async (req, res) => {
    const course = await Course.findOne({ slug: req.params.slug })
    const user = await User.findById(req.params.userId)

    if (!course || !user) {
      res.status(404).end()
      return
    }

    // TODO: allow custom weight
    const weight = 1 / course.exams.length
    const weightPercentage = (weight * 100).toLocaleString('en-US', {
      maximumFractionDigits: 1
    })

    const examsInCourse = await Exam.find({
      course: course._id
    })

    const grades: CourseGrades = {
      courseId: course._id,
      courseName: course.name,
      exams: await Promise.all(
        examsInCourse.map(async exam => {
          const examAttempts = await ExamAttempt.find({
            exam: exam.id,
            user: user.id
          })
            .sort('-score')
            .limit(1)

          const highestScore = examAttempts[0]?.score ?? 0

          return {
            slug: exam.slug,
            weight,
            label: exam.label,
            id: exam.id,
            weightPercentage,
            grade: Math.floor((highestScore / exam.examItems.length) * 100)
          }
        })
      ),
      courseTotal: 0,
      courseSlug: course.slug
    }

    grades.courseTotal = Math.round(
      grades.exams.map(exam => exam.grade * weight).reduce((a, b) => a + b, 0)
    )

    res.json(grades)
  }
)

coursesRouter.delete(
  '/:id/external-links/:externalLinkId',
  authenticate('coordinator', 'admin'),
  async (req, res) => {
    await Course.findByIdAndUpdate(req.params.id, {
      $pull: {
        externalLinks: {
          _id: req.params.externalLinkId
        }
      }
    })

    res.sendStatus(200)
  }
)

coursesRouter.put(
  '/:id/external-links',
  authenticate('coordinator', 'admin'),
  async (req, res) => {
    const body = req.body

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          externalLinks: {
            url: body.url,
            title: body.title,
            description: body.description
          }
        }
      },
      { new: true }
    )

    res.json(updatedCourse)
  }
)

coursesRouter.get('/:id/upcoming-exams', async (req, res) => {
  const course = await Course.findById(req.params.id)
  if (!course) {
    res.sendStatus(404)
  } else {
    const exams = await Exam.find({
      course: course._id,
      $or: [
        {
          startDate: {
            $exists: false
          }
        },
        {
          startDate: {
            $gt: new Date()
          }
        }
      ]
    })
      .sort('startDate')
      .populate('course')

    res.json(exams)
  }
})

coursesRouter.put(
  '/:courseId',
  authenticate('coordinator', 'admin'),
  async (req, res) => {
    const body = req.body
    const course = await Course.findById(req.params.courseId)

    // Course doesn't exist
    if (!course) {
      res.status(404).end()
      return
    }

    const userIds = body.userIds
    if (userIds) {
      const users = await User.find({ _id: { $in: userIds }, role: 'student' })

      if (!users) {
        res.status(401).json({
          error: 'Users not found.'
        })
        return
      }

      const promiseArray = users.map(user => {
        user.courses.push(course._id)
        course.studentsEnrolled.push(user._id)
        return user.save()
      })
      await Promise.all(promiseArray)

      const updatedCourse = await course.save()
      res.json(await updatedCourse.populate('coordinator').execPopulate())
    }
  }
)

coursesRouter.delete(
  '/:slug',
  authenticate('coordinator', 'admin'),
  async (req, res) => {
    await Course.findOneAndDelete({ slug: req.params.slug })
    res.status(204).end()
  }
)

coursesRouter.delete(
  '/:courseSlug/students/:studentId',
  authenticate('coordinator', 'admin'),
  async (req, res) => {
    const course = await Course.findOne({ slug: req.params.courseSlug })
    if (!course) {
      res.sendStatus(404)
    } else {
      await Course.updateOne(
        {
          _id: course._id
        },
        {
          $pull: {
            studentsEnrolled: req.params.studentId
          }
        }
      )
      await User.updateOne(
        {
          _id: req.params.studentId
        },
        {
          $pull: {
            courses: course._id
          }
        }
      )
      res.status(204).end()
    }
  }
)

export default coursesRouter
