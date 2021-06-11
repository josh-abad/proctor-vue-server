import bcrypt from 'bcrypt'
import { Router } from 'express'
import User from '@/models/user'
import md5 from 'md5'
import jwt from 'jsonwebtoken'
import { sendVerificationEmail } from './email-helper'
import ExamAttempt from '@/models/exam-attempt'
import Exam from '@/models/exam'
import Course from '@/models/course'
import config from '@/utils/config'

const usersRouter = Router()

usersRouter.post('/', async (req, res) => {
  const body = req.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    name: body.name,
    role: body.role || 'student',
    email: body.email,
    verified: false,
    avatarUrl: `https://gravatar.com/avatar/${md5(
      body.email.trim()
    )}?d=https%3A%2F%2Ficon-library.com%2Fimages%2Fdefault-profile-icon%2Fdefault-profile-icon-16.jpg`,
    passwordHash
  })

  if (!config.SECRET) {
    res.status(401).end()
    return
  }

  const token = jwt.sign({ id: user._id, email: user.email }, config.SECRET, {
    expiresIn: '1h'
  })

  sendVerificationEmail(user.email, token)

  const savedUser = await user.save()
  res.json(savedUser.toJSON())
})

usersRouter.get('/', async (_req, res) => {
  const users = await User.find({}).populate('courses').sort('name.last')
  res.json(users)
})

usersRouter.get('/students', async (_req, res) => {
  const students = await User.find({ role: 'student' })
    .populate('courses')
    .sort('name.last')
  res.json(students)
})

usersRouter.get('/students/:id', async (req, res) => {
  const user = await User.findOne({
    role: 'student',
    _id: req.params.id
  }).populate('courses')
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

usersRouter.get('/coordinators', async (_req, res) => {
  const coordinators = await User.find({ role: 'coordinator' })
    .populate('courses')
    .sort('name.last')
  res.json(coordinators)
})

usersRouter.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id).populate('courses')
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

usersRouter.get('/:id/courses', async (req, res) => {
  const user = await User.findById(req.params.id)
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
    res.status(404).end()
  }
})

usersRouter.get('/:id/attempts', async (req, res) => {
  const limit = req.query.limit ? Number(req.query.limit) : 0

  const attempts = await ExamAttempt.find({ user: req.params.id })
    .sort('-startDate')
    .limit(limit)
    .populate({ path: 'exam', populate: { path: 'course' } })
    .populate('user')
    .populate('examResult')
  res.json(attempts)
})

usersRouter.put('/:id', async (req, res) => {
  const body = req.body

  const oldUser = await User.findById(req.params.id).populate('courses')
  if (oldUser) {
    oldUser.name = body.name || oldUser.name
    oldUser.courses = body.courses || oldUser.courses

    const updatedUser = await oldUser.save()
    res.json(updatedUser.toJSON())
  }
})

usersRouter.get('/:id/recent-courses', async (req, res) => {
  const limit = req.query.limit ? Number(req.query.limit) : 5
  const user = await User.findById(req.params.id).populate('recentCourses')
  if (user) {
    res.json([...user.recentCourses].reverse().slice(0, limit))
  } else {
    res.status(404).end()
  }
})

usersRouter.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

usersRouter.get('/:id/upcoming-exams', async (req, res) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    res.status(404).end()
    return
  }

  const exams = await Exam.find({
    course: {
      $in: user.courses
    },
    startDate: {
      $gt: new Date()
    }
  })
    .sort('startDate')
    .populate('course')

  res.json(exams)
})

usersRouter.get('/:id/open-exams', async (req, res) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    res.status(404).end()
    return
  }

  const exams = await Exam.find({
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

  res.json(exams)
})

export default usersRouter
