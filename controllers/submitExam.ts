import { Router } from 'express'
import ExamItem from '../models/examItem'

const submitExamRouter = Router()

submitExamRouter.post('/', async (request, response) => {
  const answers = request.body
  let score = 0
  for (const { questionId, answer } of answers) {
    const examItem = await ExamItem.findById(questionId).select('answer')
    if (examItem?.answer === answer) {
      score++
    }
  }
  
  response.status(200).send({ score })
})

export default submitExamRouter
