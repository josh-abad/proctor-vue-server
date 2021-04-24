import { Response, Router } from 'express'
import Exam from '@/models/exam'
import ExamAttempt from '@/models/exam-attempt'
import config from '@/utils/config'
import jwt from 'jsonwebtoken'
import User from '@/models/user'
import helper, { UserToken } from './controller-helper'

const examAttemptsRouter = Router()

examAttemptsRouter.post('/', async (request, response): Promise<Response | void> => {
  const body = request.body
  
  const token = helper.getTokenFrom(request)
  
  const decodedToken = jwt.verify(token as string, config.SECRET as string)
  if (!token || !(decodedToken as UserToken).id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById((decodedToken as UserToken).id)
  const exam = await Exam.findById(body.examId)

  if (!(exam && user)) {
    response.status(401).json({
      'error': 'invalid user or exam'
    })
    return
  }

  const pastAttempts = await ExamAttempt.find({ user: user._id, exam: exam._id })

  if (pastAttempts.length >= exam.maxAttempts) {
    response.status(401).json({
      'error': 'max attempts reached'
    })
    return
  }

  const startDate = new Date()
  const endDate = new Date()
  endDate.setSeconds(endDate.getSeconds() + exam?.duration)

  const examAttempt = new ExamAttempt({
    user: user?._id,
    status: 'in-progress',
    startDate,
    endDate,
    exam: exam?._id,
    examTotal: exam?.examItems.length
  })

  const savedExamAttempt = await examAttempt.save()
  const attemptForToken = {
    userId: user?._id,
    attemptId: savedExamAttempt._id
  }

  const attemptToken = jwt.sign(attemptForToken, config.SECRET as string)

  response.json({ token: attemptToken, attempt: await savedExamAttempt.populate({ path: 'exam', populate: { path: 'course' } }).execPopulate() })
})

examAttemptsRouter.get('/', async (request, response) => {
  const userId = request.query.userId
  if (userId) {
    const examAttemptsByUser = await ExamAttempt.find({ user: userId as string }).populate({ path: 'exam', populate: { path: 'course' } })
    response.json(examAttemptsByUser)
    return
  }

  const examAttempts = await ExamAttempt.find({}).populate({ path: 'exam', populate: { path: 'course' } })
  response.json(examAttempts)
})

examAttemptsRouter.get('/:id', async (request, response) => {
  const examAttempt = await ExamAttempt.findById(request.params.id).populate({ path: 'exam', populate: { path: 'course' } })
  if (examAttempt) {
    response.json(examAttempt)
  } else {
    response.status(404).end()
  }
})

examAttemptsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const examAttempt = {
    status: body.status,
    examType: body.examType,
    courseId: body.courseId
  }

  const updatedExamItem = await ExamAttempt.findByIdAndUpdate(request.params.id, examAttempt, {
    new: true,
    runValidators: true,
    context: 'query'
  })
  response.json(updatedExamItem)
})

examAttemptsRouter.delete('/:id', async (request, response) => {
  await ExamAttempt.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

export default examAttemptsRouter
