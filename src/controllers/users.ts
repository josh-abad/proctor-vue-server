import bcrypt from 'bcrypt'
import { Router } from 'express'
import User from '@/models/user'
import md5 from 'md5'
import jwt from 'jsonwebtoken'
import { sendVerificationEmail } from './email-helper'
import upload from '@/utils/image-upload'
import ExamAttempt from '@/models/exam-attempt'
import Exam from '@/models/exam'
import Course from '@/models/course'
import { Event } from '@/types'
import helper from '@/utils/helper'
import config from '@/utils/config'

const usersRouter = Router()

usersRouter.post('/', async (req, res) => {
  const body = req.body

  const emailExists = await User.exists({ email: body.email })
  if (emailExists) {
    res.status(401).json({
      error: 'Email is already taken.'
    })
    return
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    name: body.name,
    role: body.role || 'student',
    email: body.email,
    verified: false,
    avatarUrl: `https://gravatar.com/avatar/${md5(body.email.trim())}?d=https%3A%2F%2Ficon-library.com%2Fimages%2Fdefault-profile-icon%2Fdefault-profile-icon-16.jpg`,
    passwordHash
  })

  if (!config.SECRET) {
    res.status(401).end()
    return
  }

  const token = jwt.sign({ id: user._id, email: user.email }, config.SECRET, { expiresIn: '1h' })

  sendVerificationEmail(user.email, token)

  const savedUser = await user.save()
  res.json(savedUser.toJSON())
})

usersRouter.get('/', async (_req, res) => {
  const users = await User.find({})
  res.json(users)
})

usersRouter.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

usersRouter.get('/:id/courses', async (req, res) => {
  const user = await User.findById(req.params.id).populate('courses')
  if (user) {
    res.json(user.courses)
  } else {
    res.status(404).end()
  }
})

usersRouter.get('/:id/attempts', async (req, res) => {
  const attempts = await ExamAttempt.find({ user: req.params.id })
    .populate('exam')
    .populate('examResult')
  res.json(attempts)
})

usersRouter.put('/:id', async (req, res) => {
  const body = req.body

  const oldUser = await User.findById(req.params.id)
  if (oldUser) {
    oldUser.name = body.name || oldUser.name
    oldUser.courses = body.courses || oldUser.courses

    const updatedUser = await oldUser.save()
    res.json(updatedUser.toJSON())
  }
})

usersRouter.get('/:id/recent-courses', async (req, res) => {
  const user = await User.findById(req.params.id).populate('recentCourses')
  if (user) {
    res.json(user.recentCourses)
  } else {
    res.status(404).end()
  }
})

usersRouter.put('/:id/recent-courses', async (req, res) => {
  const body = req.body

  const user = await User.findById(req.params.id)
  if (user && body.courseId) {
    if (!user.courses.some(courseId => courseId.toString() === body.courseId)) {
      res.status(401).json({
        error: 'Student is not enrolled in course.'
      })
      return
    }

    if (user.recentCourses.includes(body.courseId)) {
      user.recentCourses = user.recentCourses.filter(id => id.toString() !== body.courseId)
    }

    user.recentCourses.push(body.courseId)
    const updatedUser = await user.save()
    res.json(updatedUser.recentCourses)
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

  const exams = await Exam.find({ course: { $in: user.courses } })

  const events = await helper.getEvents(exams)

  res.json(events)
})

usersRouter.get('/:id/recent-activity', async (req, res) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    res.status(404).end()
    return
  }

  const attempts = await ExamAttempt.find({ user: user.id })
  const events: Event[] = []
  for (const attempt of attempts) {
    const exam = await Exam.findById(attempt.exam)
    const course = await Course.findById(exam?.course)

    if (!exam || !course) {
      continue
    }

    const sharedEventInfo = {
      location: course.name,
      locationUrl: `/courses/${course.id}`,
      subject: user.name.first,
      subjectId: user.id,
      subjectUrl: `/user/${user.id}`,
      predicate: exam.label,
      predicateUrl: `/courses/${course.id}/exams/${exam.id}`
    }
    const startAttemptEvent: Event = {
      ...sharedEventInfo,
      action: 'started',
      date: attempt.startDate
    }
    events.push(startAttemptEvent)
    if (attempt.status === 'completed') {
      const submitAttemptEvent: Event = {
        ...sharedEventInfo,
        action: 'completed',
        date: attempt.submittedDate
      }
      events.push(submitAttemptEvent)
    }
  }

  events.sort((a, b) => {
    return new Date(b.date).valueOf() - new Date(a.date).valueOf()
  })

  res.json(events)
})

usersRouter.post('/:id/reference-image', upload.single('image'), async (req, res) => {
  const filename = (req.file as Express.MulterS3.File).key
  const referenceImageUrl = `${config.CLOUDFRONT_DOMAIN}${filename}`

  const updatedUser = await User.findByIdAndUpdate(req.params.id, { referenceImageUrl }, { new: true })
  res.json(updatedUser)
})

export default usersRouter
