import { Response, Router } from 'express'
import config from '../utils/config'
import User from '../models/user'
import Exam from '../models/exam'
import ExamItem from '../models/exam_item'
import ExamResult from '../models/exam_result'
import ExamAttempt from '../models/exam_attempt'
import jwt from 'jsonwebtoken'
import helper, { AttemptToken } from './controller_helper'

const examResultsRouter = Router()

examResultsRouter.post('/', async (request, response): Promise<Response | void> => {
  const body = request.body
  const token = helper.getTokenFrom(request)
  const decodedToken = jwt.verify(token as string, config.SECRET)
  if (!token || !((decodedToken as AttemptToken).attemptId && (decodedToken as AttemptToken).userId)) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const answers = body.answers
  const scores: { [key: string]: number } = {}

  for (const answer of answers) {
    const examItem = await ExamItem.findById(answer.questionId).select('answer')
    scores[examItem?._id] = 0
    if (examItem?.answer === answer.answer) {
      scores[examItem?._id] += 1
    }
  }

  const user = await User.findById((decodedToken as AttemptToken).userId)
  const exam = await Exam.findById(body.examId)
  const attempt = await ExamAttempt.findById((decodedToken as AttemptToken).attemptId)
  
  const examResult = new ExamResult({
    scores,
    user: user?._id,
    exam: exam?._id,
    attempt: attempt?._id
  })

  if (attempt) {
    attempt.examResult = examResult._id
    attempt.status = 'completed'
    attempt.submittedDate = new Date()
  }
  await attempt?.save()

  const savedExamResult = await examResult.save()
  response.json(savedExamResult.toJSON())
})

examResultsRouter.get('/', async (request, response) => {
  const userId = request.query.userId
  if (userId) {
    const examResultsByUser = await ExamResult.find({ user: userId as string }).populate('exam').populate('user')
    response.json(examResultsByUser)
    return
  }
  const examResult = await ExamResult.find({}).populate('exam').populate('user')
  response.json(examResult)
})

examResultsRouter.get('/:id', async (request, response) => {
  const examResult = await ExamResult.findById(request.params.id)
  if (examResult){
    response.json(examResult)
  } else {
    response.status(404).end()
  }
})

examResultsRouter.delete('/:id', async (request, response) => {
  await ExamResult.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

export default examResultsRouter
