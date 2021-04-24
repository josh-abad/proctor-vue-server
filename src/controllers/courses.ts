import { Router } from 'express'
import Course, { CourseDocument } from '@/models/course'
import Exam from '@/models/exam'
import User from '@/models/user'
import helper from '@/utils/helper'

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

coursesRouter.get('/:id/exams', async (req, res) => {
  const course = await Course.findById(req.params.id)
  if (course) {
    const exams = await Exam.find({ _id: { $in: course.exams } }).populate('course')
    res.json(exams)
  } else {
    res.status(404).end()
  }
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
