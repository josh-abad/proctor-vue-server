import { CourseGrades } from '@/types'
import { Router } from 'express'
import Course, { CourseDocument } from '@/models/course'
import Exam from '@/models/exam'
import User from '@/models/user'
import helper from '@/utils/helper'
import ExamAttempt from '@/models/exam-attempt'

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
    weeks: body.weeks
  })

  coordinator.courses.push(course._id)
  await coordinator.save()

  const savedCourse = await course.save()
  res.json(await savedCourse.populate('coordinator').execPopulate())
})

coursesRouter.get('/', async (req, res) => {
  const userId = req.query.userId
  if (userId) {
    const user = await User.findById(userId)
    if (user) {
      const coursesByUser: CourseDocument[] = []
      for (const courseId of user.courses) {
        const course = await Course.findById(courseId)
        if (course) {
          coursesByUser.push(course)
        } else {
          user.courses = user.courses.filter(id => id !== courseId)
          await user.save()
        }
      }
      res.json(coursesByUser)
      return
    }
  }
  const courses = await Course.find({}).populate('coordinator')
  res.json(courses)
})

coursesRouter.get('/:id', async (req, res) => {
  const course = await Course.findById(req.params.id).populate('coordinator')
  if (course) {
    res.json(course)
  } else {
    res.status(404).end()
  }
})

coursesRouter.get('/:id/students', async (req, res) => {
  const course = await Course.findById(req.params.id)
  if (course) {
    const students = await User.find({ _id: { $in: course.studentsEnrolled } })
    res.json(students)
  } else {
    res.status(404).end()
  }
})

coursesRouter.get('/:id/progress/:user', async (req, res) => {
  const { id, user } = req.params

  const course = await Course.findById(id)

  if (!course) {
    res.status(404).end()
    return
  }

  const uniqueExamsTakenByUser = await ExamAttempt.distinct('exam', {
    exam: {
      $in: course.exams
    },
    user
  })

  const percentage = uniqueExamsTakenByUser.length === 0
    ? 0
    : Math.floor(uniqueExamsTakenByUser.length / course.exams.length * 100)

  res.json({ percentage })
})

coursesRouter.get('/:id/exams', async (req, res) => {
  const exams = await Exam.find({ course: req.params.id }).populate('course')
  res.json(exams)
})

coursesRouter.get('/:id/grades/:user', async (req, res) => {
  const { id, user } = req.params

  const examsInCourse = await Exam.find({ course: id })

  const course = await Course.findById(id)

  if (!course) {
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
  const weight = 1 / examsInCourse.length
  for (const exam of examsInCourse) {
    const examAttempts = await ExamAttempt.find({ exam: exam.id, user })

    const highestScore = examAttempts.reduce((a, b) => {
      return Math.max(a, b.score)
    }, 0)

    grades.exams.push({
      weight,
      label: exam.label,
      id: exam.id,
      weightPercentage: (weight * 100).toLocaleString('en-US', { maximumFractionDigits: 1 }),
      grade: Math.floor(highestScore / exam.examItems.length * 100)
    })
  }

  grades.courseTotal = Math.round(
    grades.exams
      .map(exam => exam.grade * weight)
      .reduce((a, b) => a + b, 0)
  )

  res.json(grades)
})

coursesRouter.get('/:course/exams/week/:week', async (req, res) => {
  const { course, week } = req.params
  const exams = await Exam.find({ course, week: Number(week) }).populate('course')
  res.json(exams)
})

coursesRouter.get('/v2/:id/upcoming-exams', async (req, res) => {
  const exams = await Exam.find({
    course: req.params.id,
    startDate: {
      $gt: new Date()
    }
  }).populate('course')

  res.json(exams)
})

coursesRouter.get('/:id/upcoming-exams', async (req, res) => {
  const course = await Course.findById(req.params.id)

  if (!course) {
    res.status(404).end()
    return
  }

  const exams = await Exam.find({ _id: { $in: course.exams } })
  const events = await helper.getEvents(exams)

  res.json(events)
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

coursesRouter.delete('/:id', async (req, res) => {
  await Course.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

coursesRouter.delete('/:courseId/students/:studentId', async (req, res) => {
  await Course.update({
    _id: req.params.courseId
  },
  {
    $pull: {
      studentsEnrolled: req.params.studentId
    }
  })
  await User.update({
    _id: req.params.studentId
  },
  {
    $pull: {
      courses: req.params.courseId
    }
  })
  res.status(204).end()
})

export default coursesRouter
