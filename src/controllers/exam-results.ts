import { Router } from 'express'
import Exam from '@/models/exam'
import ExamResult, { Score } from '@/models/exam-result'
import ExamAttempt from '@/models/exam-attempt'
import { authenticate } from '@/utils/middleware'
import { Answer } from '@/types'

const examResultsRouter = Router()

examResultsRouter.post('/', authenticate, async (req, res) => {
  const body = req.body

  const exam = await Exam.findById(body.examId).select('examItems _id')
  const answers: Answer[] = body.answers

  const scores: Score[] = answers.map(answer => {
    const examItem = exam?.examItems.find(ei => ei.id === answer.examItem)
    let points = 0
    if (examItem && examItem.answer && examItem.questionType !== 'essay') {
      if (examItem && examItem.questionType !== 'multiple answers') {
        if (examItem.questionType === 'text' && !examItem.caseSensitive) {
          points =
            examItem.answer?.[0].toLowerCase() ===
            answer.answer[0].toLowerCase()
              ? examItem.points
              : 0
        } else {
          points =
            examItem.answer?.[0] === answer.answer[0] ? examItem.points : 0
        }
      } else {
        points = examItem.answer.reduce(
          (a, b) => (answer.answer.includes(b) ? a + 1 : a),
          0
        )
      }
    }
    return {
      points,
      examItem: examItem?.id as string
    }
  })

  const user = req.user

  const examResult = new ExamResult({
    scores,
    user: user?._id,
    exam: exam?._id,
    attempt: body.attemptId
  })

  const savedAttempt = await ExamAttempt.findOneAndUpdate(
    {
      user: user?._id,
      status: 'in-progress',
      exam: exam?._id
    },
    {
      answers,
      examResult: examResult._id,
      status: 'completed',
      submittedDate: new Date(),
      score: scores.reduce((x: number, y: Score) => x + y.points, 0),
      pendingGrade:
        exam?.examItems.some(ei => {
          return (
            ei.questionType === 'essay' &&
            answers.some(
              answer =>
                answer.examItem === ei.id && answer.answer[0]?.length > 0
            )
          )
        }) ?? false
    },
    { new: true }
  ).populate({ path: 'exam', populate: { path: 'course' } })

  const savedExamResult = await examResult.save()

  res.json({
    examResult: await savedExamResult.populate('user').execPopulate(),
    attempt: savedAttempt?.toJSON()
  })
})

export default examResultsRouter
