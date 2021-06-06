import Course from '@/models/course'
import Exam from '@/models/exam'
import { Router } from 'express'
import upload from '@/utils/image-upload'
import config from '@/utils/config'
import { authenticate } from '../utils/middleware'
import ExamAttempt from '@/models/exam-attempt'
import { CourseGrades } from '@/types'

const userRouter = Router()

userRouter.get('/', authenticate, async (req, res) => {
  const user = req.user

  if (user) {
    res.json(await user.populate('courses').execPopulate())
  } else {
    res.sendStatus(404)
  }
})

userRouter.get('/courses', authenticate, async (req, res) => {
  const user = req.user
  if (user) {
    const courses = await Course.find({ _id: { $in: user.courses } }).sort(
      'name'
    )
    const coursesWithProgress = courses.map(async course => {
      const uniqueExamsTakenByUser = await ExamAttempt.distinct('exam', {
        exam: {
          $in: course.exams
        },
        user: user._id,
        score: { $gt: 0 }
      })

      const percentage =
        uniqueExamsTakenByUser.length === 0
          ? 0
          : Math.floor(
              (uniqueExamsTakenByUser.length / course.exams.length) * 100
            )
      return {
        ...course.toJSON(),
        progress: percentage
      }
    })
    res.json(await Promise.all(coursesWithProgress))
  } else {
    res.sendStatus(404)
  }
})

userRouter.get('/exams-taken/:id', authenticate, async (req, res) => {
  const user = req.user
  const course = await Course.findById(req.params.id)

  if (!user || !course) {
    res.sendStatus(404)
  } else {
    const examsTaken = course.exams.map(async exam => {
      const count = await ExamAttempt.countDocuments({
        exam,
        user: user._id
      })

      return {
        exam,
        isTaken: count > 0
      }
    })
    res.json(await Promise.all(examsTaken))
  }
})

userRouter.get('/attempts', authenticate, async (req, res) => {
  const limit = req.query.limit ? Number(req.query.limit) : 0
  const user = req.user

  if (user) {
    const attempts = await ExamAttempt.find({ user: user._id })
      .sort('-startDate')
      .limit(limit)
      .populate({ path: 'exam', populate: { path: 'course' } })
      .populate('user')
      .populate('examResult')
    res.json(attempts)
  } else {
    res.sendStatus(404)
  }
})

userRouter.get('/recent-courses', authenticate, async (req, res) => {
  const limit = req.query.limit ? Number(req.query.limit) : 5
  const user = req.user
  if (user) {
    const { recentCourses } = await user
      .populate('recentCourses')
      .execPopulate()
    res.json([...recentCourses].reverse().slice(0, limit))
  } else {
    res.sendStatus(404)
  }
})

userRouter.put('/recent-courses', authenticate, async (req, res) => {
  const body = req.body

  const user = req.user
  if (user && body.courseId) {
    if (
      user.role !== 'admin' &&
      !user.courses.some(courseId => courseId.toString() === body.courseId)
    ) {
      res.status(401).json({
        error: 'Student is not enrolled in course.'
      })
      return
    }

    if (user.recentCourses.includes(body.courseId)) {
      user.recentCourses = user.recentCourses.filter(
        id => id.toString() !== body.courseId
      )
    }

    user.recentCourses.push(body.courseId)
    const updatedUser = await user.save()
    res.json(updatedUser.recentCourses)
  }
})

userRouter.delete('/', authenticate, async (req, res) => {
  const user = req.user
  await user?.delete()
  res.sendStatus(204)
})

userRouter.get('/upcoming-exams', authenticate, async (req, res) => {
  const user = req.user

  if (!user) {
    res.sendStatus(404)
  } else {
    const upcomingExams = await Exam.find({
      course: {
        $in: user.courses
      },
      startDate: {
        $gt: new Date()
      }
    })
      .sort('startDate')
      .populate('course')

    res.json(upcomingExams)
  }
})

userRouter.get('/open-exams', authenticate, async (req, res) => {
  const user = req.user

  if (!user) {
    res.sendStatus(404)
  } else {
    const openExams = await Exam.find({
      course: {
        $in: user.courses
      },
      startDate: {
        $lte: new Date()
      },
      endDate: {
        $gte: new Date()
      }
    })
      .sort('endDate')
      .populate('course')

    res.json(openExams)
  }
})

userRouter.post(
  '/reference-image',
  authenticate,
  upload.single('image'),
  async (req, res) => {
    const filename = (req.file as Express.MulterS3.File).key
    const referenceImageUrl = `${config.CLOUDFRONT_DOMAIN}${filename}`

    const user = req.user
    if (user) {
      user.referenceImageUrl = referenceImageUrl
      const updatedUser = await user.save()
      res.json(await updatedUser.populate('courses').execPopulate())
    } else {
      res.sendStatus(404)
    }
  }
)

userRouter.get('/grades/:id', authenticate, async (req, res) => {
  const { id } = req.params

  const user = req.user
  const course = await Course.findById(id)

  if (!course || !user) {
    res.status(404).end()
    return
  }

  const grades: CourseGrades = {
    courseId: course._id,
    courseName: course.name,
    exams: [],
    courseTotal: 0
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

export default userRouter
