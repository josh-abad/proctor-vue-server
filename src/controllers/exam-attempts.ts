import { Router } from 'express'
import Exam from '@/models/exam'
import ExamAttempt from '@/models/exam-attempt'
import { authenticate } from '@/utils/middleware'

const examAttemptsRouter = Router()

examAttemptsRouter.post('/', authenticate, async (req, res) => {
  const body = req.body

  const user = req.user
  const exam = await Exam.findById(body.examId)

  if (!(exam && user)) {
    res.status(401).json({
      error: 'invalid user or exam'
    })
    return
  }

  const hasInProgressAttempt = await ExamAttempt.exists({
    user: user._id,
    status: 'in-progress'
  })
  if (hasInProgressAttempt) {
    res.status(401).json({
      error: 'attempt currently in-progress'
    })
    return
  }

  const pastAttempts = await ExamAttempt.countDocuments({
    user: user._id,
    exam: exam._id
  })

  if (pastAttempts >= exam.maxAttempts) {
    res.status(401).json({
      error: 'max attempts reached'
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

  res.json(
    await savedExamAttempt
      .populate({ path: 'exam', populate: { path: 'course' } })
      .execPopulate()
  )
})

examAttemptsRouter.get('/', async (_req, res) => {
  const examAttempts = await ExamAttempt.find({}).populate({
    path: 'exam',
    populate: { path: 'course' }
  })
  res.json(examAttempts)
})

examAttemptsRouter.get('/:id', async (req, res) => {
  const examAttempt = await ExamAttempt.findById(req.params.id).populate({
    path: 'exam',
    populate: { path: 'course' }
  })
  if (examAttempt) {
    res.json(examAttempt)
  } else {
    res.status(404).end()
  }
})

examAttemptsRouter.put('/:id', async (req, res) => {
  const body = req.body

  const examAttempt = {
    status: body.status,
    examType: body.examType,
    courseId: body.courseId
  }

  const updatedExamItem = await ExamAttempt.findByIdAndUpdate(
    req.params.id,
    examAttempt,
    {
      new: true,
      runValidators: true,
      context: 'query'
    }
  )
  res.json(updatedExamItem)
})

examAttemptsRouter.delete('/:id', async (req, res) => {
  await ExamAttempt.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

export default examAttemptsRouter
