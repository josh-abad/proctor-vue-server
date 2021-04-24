import { Response, Router } from 'express'
import Course from '@/models/course'
import Exam, { ExamDocument } from '@/models/exam'
import config from '@/utils/config'
import jwt from 'jsonwebtoken'
import User from '@/models/user'
import helper, { UserToken } from './controller_helper'

const examsRouter = Router()

examsRouter.post('/', async (request, response): Promise<Response | void> => {
  const body = request.body

  const token = helper.getTokenFrom(request)
  
  const decodedToken = jwt.verify(token as string, config.SECRET as string)
  if (!token || !(decodedToken as UserToken).id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById((decodedToken as UserToken).id)
  const course = await Course.findById(body.courseId)

  if (!(course && user)) {
    response.status(401).json({
      'error': 'invalid user or course'
    })
    return
  }

  if (user.role === 'student') {
    response.status(401).json({
      'error': 'role does not permit creation of new exams'
    })
    return
  }

  if (user.role !== 'admin' && user.id !== course.coordinator.toString()) {
    response.status(401).json({
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
  response.json(await savedExam.populate('course').execPopulate())
})

examsRouter.get('/', async (_request, response) => {
  const exam = await Exam.find({}).populate('course')
  response.json(exam)
})

examsRouter.get('/:id', async (request, response) => {
  const exam = await Exam.findById(request.params.id)
  if (exam) {
    response.json(exam)
  } else {
    response.status(404).end()
  }
})

examsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const exam = {
    label: body.label,
    questions: body.questions,
    length: body.length || body.questions.length,
    duration: body.duration,
    random: body.random,
    course: body.courseId,
    maxAttempts: body.maxAttempts
  }

  const updatedExam = await Exam.findByIdAndUpdate(request.params.id, exam, {
    new: true,
    runValidators: true,
    context: 'query'
  })
  response.json(updatedExam)
})

examsRouter.delete('/:id', async (request, response) => {
  await Exam.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

export default examsRouter
