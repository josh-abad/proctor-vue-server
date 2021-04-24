import { Response, Router } from 'express'
import Exam from '@/models/exam'
import ExamAttempt from '@/models/exam-attempt'
import config from '@/utils/config'
import jwt from 'jsonwebtoken'
import User from '@/models/user'
import helper from './controller-helper'
import { UserToken } from '@/types'

const examAttemptsRouter = Router()

examAttemptsRouter.post('/', async (req, res): Promise<Response | void> => {
  const body = req.body
  
  const token = helper.getTokenFrom(req)
  
  const decodedToken = jwt.verify(token as string, config.SECRET as string)
  if (!token || !(decodedToken as UserToken).id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById((decodedToken as UserToken).id)
  const exam = await Exam.findById(body.examId)

  if (!(exam && user)) {
    res.status(401).json({
      'error': 'invalid user or exam'
    })
    return
  }

  const pastAttempts = await ExamAttempt.find({ user: user._id, exam: exam._id })

  if (pastAttempts.length >= exam.maxAttempts) {
    res.status(401).json({
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

  res.json({ token: attemptToken, attempt: await savedExamAttempt.populate({ path: 'exam', populate: { path: 'course' } }).execPopulate() })
})

examAttemptsRouter.get('/', async (req, res) => {
  const userId = req.query.userId
  if (userId) {
    const examAttemptsByUser = await ExamAttempt.find({ user: userId as string }).populate({ path: 'exam', populate: { path: 'course' } })
    res.json(examAttemptsByUser)
    return
  }

  const examAttempts = await ExamAttempt.find({}).populate({ path: 'exam', populate: { path: 'course' } })
  res.json(examAttempts)
})

examAttemptsRouter.get('/:id', async (req, res) => {
  const examAttempt = await ExamAttempt.findById(req.params.id).populate({ path: 'exam', populate: { path: 'course' } })
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

  const updatedExamItem = await ExamAttempt.findByIdAndUpdate(req.params.id, examAttempt, {
    new: true,
    runValidators: true,
    context: 'query'
  })
  res.json(updatedExamItem)
})

examAttemptsRouter.delete('/:id', async (req, res) => {
  await ExamAttempt.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

export default examAttemptsRouter
