import { Request, Response, Router } from 'express'
import jwt from 'jsonwebtoken'
import config from '../utils/config'
import User from '../models/user'
import Exam from '../models/exam'
import ExamItem from '../models/exam_item'
import ExamResult from '../models/exam_result'

const examResultsRouter = Router()

const getTokenFrom = (request: Request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

interface TokenInterface {
  username: string;
  id: string;
}

examResultsRouter.post('/', async (request, response): Promise<Response | void> => {
  const body = request.body
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token as string, config.SECRET)
  if (!token || !(decodedToken as TokenInterface).id) {
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

  const user = await User.findById((decodedToken as TokenInterface).id)
  const exam = await Exam.findById(body.examId)
  
  const examResult = new ExamResult({
    user: user?._id,
    exam: exam?._id,
    scores
  })

  const savedExamResult = await examResult.save()
  response.json(savedExamResult.toJSON())
})

examResultsRouter.get('/', async (_request, response) => {
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
