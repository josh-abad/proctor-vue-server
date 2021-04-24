import { Router } from 'express'
import Course from '@/models/course'
import Exam, { ExamDocument } from '@/models/exam'
import config from '@/utils/config'
import jwt from 'jsonwebtoken'
import User from '@/models/user'
import helper from './controller-helper'
import { UserToken } from '@/types'

const examsRouter = Router()

examsRouter.post('/', async (req, res) => {
  const body = req.body

  const token = helper.getTokenFrom(req)
  
  const decodedToken = jwt.verify(token as string, config.SECRET as string)
  if (!token || !(decodedToken as UserToken).id) {
    res.status(401).json({ error: 'token missing or invalid' })
    return
  }

  const user = await User.findById((decodedToken as UserToken).id)
  const course = await Course.findById(body.courseId)

  if (!(course && user)) {
    res.status(401).json({
      'error': 'invalid user or course'
    })
    return
  }

  if (user.role === 'student') {
    res.status(401).json({
      'error': 'role does not permit creation of new exams'
    })
    return
  }

  if (user.role !== 'admin' && user.id !== course.coordinator.toString()) {
    res.status(401).json({
      'error': 'coordinator not assigned to course'
    })
    return
  }

  const exam = new Exam({
    label: body.label,
    examItems: body.examItems,
    length: body.length || body.examItems.length,
    duration: body.duration,
    random: body.random,
    course: course?._id,
    maxAttempts: body.maxAttempts,
    week: body.week,
    startDate: body.startDate, 
    endDate: body.endDate
  } as ExamDocument)

  const savedExam = await exam.save()
  if (course) {
    course.exams = course?.exams.concat(savedExam._id)
    await course.save()
  }
  res.json(await savedExam.populate('course').execPopulate())
})

examsRouter.get('/', async (_req, res) => {
  const exam = await Exam.find({}).populate('course')
  res.json(exam)
})

examsRouter.get('/:id', async (req, res) => {
  const exam = await Exam.findById(req.params.id)
  if (exam) {
    res.json(exam)
  } else {
    res.status(404).end()
  }
})

examsRouter.put('/:id', async (req, res) => {
  const body = req.body

  const exam = {
    label: body.label,
    questions: body.questions,
    length: body.length || body.questions.length,
    duration: body.duration,
    random: body.random,
    course: body.courseId,
    maxAttempts: body.maxAttempts
  }

  const updatedExam = await Exam.findByIdAndUpdate(req.params.id, exam, {
    new: true,
    runValidators: true,
    context: 'query'
  })
  res.json(updatedExam)
})

examsRouter.delete('/:id', async (req, res) => {
  await Exam.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

export default examsRouter
