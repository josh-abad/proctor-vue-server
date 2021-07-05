import User from '@/models/user'
import Course from '@/models/course'
import Exam from '@/models/exam'
import { Router } from 'express'
import upload from '@/utils/image-upload'
import config from '@/utils/config'
import { authenticate } from '../utils/middleware'
import ExamAttempt from '@/models/exam-attempt'
import { CourseGrades } from '@/types'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { sendResetPasswordEmail } from './email-helper'

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
    const courses =
      user.role === 'admin'
        ? await Course.find({}).sort('name')
        : await Course.find({ _id: { $in: user.courses } }).sort('name')
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
  const examId = req.query.exam
  const user = req.user

  if (user) {
    if (examId) {
      if (typeof examId === 'string') {
        const attemptsByExam = await ExamAttempt.find({
          user: user._id,
          exam: examId
        })
          .sort('-startDate')
          .limit(limit)
          .populate({ path: 'exam', populate: { path: 'course' } })
          .populate('user')
          .populate('examResult')
        res.json(attemptsByExam)
      } else {
        res.sendStatus(401)
      }
    } else {
      const attempts = await ExamAttempt.find({ user: user._id })
        .sort('-startDate')
        .limit(limit)
        .populate({ path: 'exam', populate: { path: 'course' } })
        .populate('user')
        .populate('examResult')
      res.json(attempts)
    }
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

// HACK: I need a way to get an exam along with its answers as a coordinator/admin
userRouter.get(
  '/courses/:courseSlug/exams/:examSlug',
  authenticate,
  async (req, res) => {
    const user = req.user

    if (!user || user.role === 'student') {
      res.sendStatus(401)
      return
    }

    const course = await Course.findOne({ slug: req.params.courseSlug })
    const exam = await Exam.findOne({
      slug: req.params.examSlug,
      course: course?._id
    })
      .select(
        'examItems random label length duration maxAttempts week startDate endDate slug id'
      )
      .populate('course')

    if (exam) {
      res.json(exam)
    } else {
      res.sendStatus(404)
    }
  }
)

userRouter.get('/exams', authenticate, async (req, res) => {
  const user = req.user

  if (!user) {
    res.sendStatus(404)
  } else {
    const exams = await Exam.find({
      course: {
        $in: user.courses
      }
    }).populate('course')

    res.json(exams)
  }
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
      $or: [
        {
          startDate: {
            $lte: new Date()
          },
          endDate: {
            $gte: new Date()
          }
        },
        {
          startDate: {
            $exists: true
          },
          endDate: {
            $exists: false
          }
        }
      ]
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

userRouter.get('/grades/:slug', authenticate, async (req, res) => {
  const user = req.user
  const course = await Course.findOne({ slug: req.params.slug })

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
})

userRouter.post('/deactivate', authenticate, async (req, res) => {
  const user = req.user

  if (user) {
    user.active = false
    await user.save()
    res.sendStatus(200)
  } else {
    res.sendStatus(404)
  }
})

userRouter.post('/forgot-password', async (req, res) => {
  const body = req.body

  const user = await User.findOne({ email: body.email })

  if (!user) {
    res.status(404).json({
      error: 'User not found'
    })
    return
  }

  const userForToken = {
    email: user.email,
    id: user._id,
    role: user.role
  }

  const token = jwt.sign(userForToken, config.SECRET as string, {
    expiresIn: '1 hour'
  })

  await sendResetPasswordEmail(user.email, token)

  res.status(200).end()
})

userRouter.post('/reset-password', authenticate, async (req, res) => {
  const user = req.user

  if (!user) {
    res.status(404).json({
      error: 'User not found'
    })
    return
  }

  const body = req.body

  if (!body.newPassword) {
    res.status(400).json({
      error: 'No new password'
    })
    return
  }

  const saltRounds = 10
  const newPasswordHash = await bcrypt.hash(body.newPassword, saltRounds)
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { passwordHash: newPasswordHash },
    { new: true }
  )
  res.json(updatedUser)
})

userRouter.put('/password', authenticate, async (req, res) => {
  const user = await User.findById(req.user?._id).select('passwordHash')

  const body = req.body

  const passwordCorrect =
    user !== null && user.passwordHash
      ? await bcrypt.compare(body.oldPassword, user.passwordHash)
      : false

  if (!user || !passwordCorrect) {
    res.status(401).json({
      error: 'Old password is incorrect'
    })
  } else if (!body.newPassword) {
    res.status(400).json({
      error: 'No new password'
    })
  } else {
    const saltRounds = 10
    const newPasswordHash = await bcrypt.hash(body.newPassword, saltRounds)

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { passwordHash: newPasswordHash },
      { new: true }
    )
    res.json(updatedUser)
  }
})

export default userRouter
