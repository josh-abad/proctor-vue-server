import { Response, Router } from 'express'
import config from '../utils/config'
import User from '../models/user'
import Exam from '../models/exam'
import ExamResult, { Score } from '../models/exam_result'
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

  const exam = await Exam.findById(body.examId)
  const answers = body.answers
  const scores: Score[] = []

  for (const answer of answers) {
    const examItem = exam?.examItems.find(ei => ei.question === answer.question)
    scores.push({
      question: examItem?.question as string,
      points: examItem?.answer === answer.answer ? 1 : 0 
    })
  }

  const user = await User.findById((decodedToken as AttemptToken).userId)
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
    attempt.score = scores.reduce((x: number, y: Score) => x + y.points, 0)
  }

  const savedAttempt = await attempt?.save()
  const savedExamResult = await examResult.save()

  response.json({
    examResult: savedExamResult.toJSON(),
    attempt: savedAttempt?.toJSON()
  })
})

examResultsRouter.get('/', async (request, response) => {
  const userId = request.query.userId
  if (userId) {
    const examResultsByUser = await ExamResult.find({ user: userId as string }).populate('user')
    response.json(examResultsByUser)
    return
  }
  const examResult = await ExamResult.find({}).populate('user')
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