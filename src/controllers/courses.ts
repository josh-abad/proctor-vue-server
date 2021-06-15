import { CourseGrades } from '@/types'
import { Router } from 'express'
import Course from '@/models/course'
import Exam from '@/models/exam'
import User from '@/models/user'
import ExamAttempt from '@/models/exam-attempt'
import slugify from 'slugify'

const coursesRouter = Router()

coursesRouter.post('/', async (req, res) => {
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
})

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

coursesRouter.get('/:slug/students', async (req, res) => {
  const course = await Course.findOne({ slug: req.params.slug })
  if (course) {
    const students = await User.find({
      _id: { $in: course.studentsEnrolled }
    }).populate('courses')
    res.json(students)
  } else {
    res.status(404).end()
  }
})

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

coursesRouter.get('/:id/exams', async (req, res) => {
  const exams = await Exam.find({ course: req.params.id }).populate('course')
  res.json(exams)
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

coursesRouter.get('/:slug/grades/:userId', async (req, res) => {
  const course = await Course.findOne({ slug: req.params.slug })
  const user = await User.findById(req.params.userId)

  if (!course || !user) {
    res.status(404).end()
    return
  }

  const grades: CourseGrades = {
    courseId: course._id,
    courseName: course.name,
    exams: [],
    courseTotal: 0,
    courseSlug: course.slug
  }

  // TODO: allow custom weight
  const weight = 1 / course.exams.length
  const weightPercentage = (weight * 100).toLocaleString('en-US', {
    maximumFractionDigits: 1
  })

  grades.exams = await ExamAttempt.aggregate([
    {
      $match: {
        user: user._id,
        exam: { $in: course.exams }
      }
    },
    {
      $group: {
        _id: '$exam',
        score: { $max: '$score' }
      }
    },
    {
      $project: {
        weight: { $literal: weight },
        weightPercentage: { $literal: weightPercentage },
        id: '$_id',
        exam: '$_id',
        _id: 0,
        score: 1
      }
    },
    {
      $lookup: {
        from: 'exams',
        localField: 'exam',
        foreignField: '_id',
        as: 'exam'
      }
    },
    {
      $unwind: '$exam'
    },
    {
      $project: {
        weight: 1,
        weightPercentage: 1,
        id: 1,
        label: '$exam.label',
        slug: '$exam.slug',
        grade: {
          $floor: {
            $multiply: [
              {
                $divide: [
                  '$score',
                  {
                    $size: '$exam.examItems'
                  }
                ]
              },
              100
            ]
          }
        }
      }
    }
  ])

  // grades.exams.push(...attempts.map(({ exam, score, examId }) => ({
  //   weight,
  //   label: exam[0].label,
  //   id: examId,
  //   weightPercentage: (weight * 100).toLocaleString('en-US', { maximumFractionDigits: 1 }),
  //   grade: Math.floor(score / exam[0].examItems.length * 100)
  // })))

  // for (const exam of examsInCourse) {
  //   const examAttempts = await ExamAttempt.find({ exam: exam.id, user: user.id }).sort('-score').limit(1)

  // const highestScore = examAttempts[0]?.score ?? 0

  //   grades.exams.push({
  //     weight,
  //     label: exam.label,
  //     id: exam.id,
  //     weightPercentage: (weight * 100).toLocaleString('en-US', { maximumFractionDigits: 1 }),
  //     grade: Math.floor(highestScore / exam.examItems.length * 100)
  //   })
  // }

  grades.courseTotal = Math.round(
    grades.exams.map(exam => exam.grade * weight).reduce((a, b) => a + b, 0)
  )

  res.json(grades)
})

coursesRouter.get('/:slug/exams/week/:week', async (req, res) => {
  const course = await Course.findOne({ slug: req.params.slug })
  if (!course) {
    res.sendStatus(404)
  } else {
    const exams = await Exam.find({
      course: course._id,
      week: Number(req.params.week)
    }).populate('course')
    res.json(exams)
  }
})

coursesRouter.get('/:id/upcoming-exams', async (req, res) => {
  const course = await Course.findById(req.params.id)
  if (!course) {
    res.sendStatus(404)
  } else {
    const exams = await Exam.find({
      course: course._id,
      startDate: {
        $gt: new Date()
      }
    })
      .sort('startDate')
      .populate('course')

    res.json(exams)
  }
})

coursesRouter.put('/:courseId', async (req, res) => {
  const body = req.body
  const course = await Course.findById(req.params.courseId)

  // Course doesn't exist
  if (!course) {
    res.status(404).end()
    return
  }

  // If req contains a userId, it's a req for enrollment for one student
  const userId = body.userId
  if (userId) {
    const user = await User.findById(userId)

    if (!user) {
      res.status(401).json({
        error: 'User not found.'
      })
      return
    }

    if (user.role !== 'student') {
      res.status(401).json({
        error: 'User is not a student.'
      })
      return
    }

    if (user.courses.includes(course.id)) {
      res.status(401).json({
        error: 'Student is already enrolled in course.'
      })
      return
    }

    user.courses.push(course._id)
    await user.save()

    course.studentsEnrolled.push(user._id)
    const updatedCourse = await course.save()
    res.json(await updatedCourse.populate('coordinator').execPopulate())
    return
  }

  // If req contains a userIds, it's a req for enrollment for single/multiple student(s)
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
})

coursesRouter.delete('/:slug', async (req, res) => {
  await Course.findOneAndDelete({ slug: req.params.slug })
  res.status(204).end()
})

coursesRouter.delete('/:courseSlug/students/:studentId', async (req, res) => {
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
          courses: req.params.courseId
        }
      }
    )
    res.status(204).end()
  }
})

export default coursesRouter
