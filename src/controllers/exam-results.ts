import { Router } from 'express'
import Exam from '@/models/exam'
import ExamResult, { Score } from '@/models/exam-result'
import ExamAttempt from '@/models/exam-attempt'
import { authenticate } from '@/utils/middleware'

const examResultsRouter = Router()

examResultsRouter.post('/', authenticate, async (req, res) => {
  const body = req.body

  const exam = await Exam.findById(body.examId).select('examItems _id')
  const answers: { id: string; answer: string[] | string }[] = body.answers
  const scores: Score[] = []

  for (const answer of answers) {
    const examItem = exam?.examItems.find(ei => ei.id === answer.id)
    let points = 0
    if (examItem && examItem.answer) {
      if (
        examItem &&
        examItem.questionType !== 'multiple answers' &&
        typeof answer.answer === 'string'
      ) {
        if (examItem.questionType === 'text' && !examItem.caseSensitive) {
          points =
            examItem.answer?.[0].toLowerCase() === answer.answer.toLowerCase()
              ? 1
              : 0
        } else {
          points = examItem.answer?.[0] === answer.answer ? 1 : 0
        }
      } else {
        points = examItem.answer.reduce(
          (_a, b) => (answer.answer.includes(b) ? 1 : 0),
          0
        )
      }
    }
    scores.push({
      points,
      question: examItem?.question as string
    })
  }

  const user = req.user
  const attempt = await ExamAttempt.findOne({
    user: user?._id,
    status: 'in-progress',
    exam: exam?._id
  }).populate({ path: 'exam', populate: { path: 'course' } })

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

  res.json({
    examResult: await savedExamResult.populate('user').execPopulate(),
    attempt: savedAttempt?.toJSON()
  })
})

examResultsRouter.get('/', async (_req, res) => {
  const examResult = await ExamResult.find({}).populate('user')
  res.json(examResult)
})

examResultsRouter.get('/:id', async (req, res) => {
  const examResult = await ExamResult.findById(req.params.id).populate('user')
  if (examResult) {
    res.json(examResult)
  } else {
    res.status(404).end()
  }
})

examResultsRouter.delete('/:id', async (req, res) => {
  await ExamResult.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

export default examResultsRouter
