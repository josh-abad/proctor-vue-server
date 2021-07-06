import { Router } from 'express'
import Course from '@/models/course'
import Exam, { ExamDocument } from '@/models/exam'
import { authenticate } from '@/utils/middleware'
import slugify from 'slugify'

const examsRouter = Router()

examsRouter.put(
  '/:id',
  authenticate('coordinator', 'admin'),
  async (req, res) => {
    const body = req.body

    const user = req.user
    const course = await Course.findById(body.courseId)

    if (
      user?.role !== 'admin' &&
      user?.id !== course?.coordinator?.toString()
    ) {
      res.status(401).json({
        error: 'coordinator not assigned to course'
      })
      return
    }

    const updatedExam = await Exam.findByIdAndUpdate(
      req.params.id,
      {
        label: body.label,
        examItems: body.examItems,
        length: body.length || body.examItems.length,
        duration: body.duration,
        random: body.random,
        maxAttempts: body.maxAttempts,
        week: body.week,
        startDate: body.startDate,
        endDate: body.endDate,
        slug: slugify(body.label, {
          lower: true,
          strict: true
        })
      },
      { new: true, runValidators: true, context: 'query' }
    )

    res.json(await updatedExam?.populate('course').execPopulate())
  }
)

examsRouter.put(
  '/:id/open',
  authenticate('coordinator', 'admin'),
  async (req, res) => {
    const exam = await Exam.findByIdAndUpdate(
      req.params.id,
      { startDate: new Date() },
      { new: true, runValidators: true, context: 'query' }
    ).populate('course')

    if (exam) {
      res.json(exam)
    } else {
      res.sendStatus(404)
    }
  }
)

examsRouter.put(
  '/:id/close',
  authenticate('coordinator', 'admin'),
  async (req, res) => {
    const exam = await Exam.findByIdAndUpdate(
      req.params.id,
      { endDate: new Date() },
      { new: true, runValidators: true, context: 'query' }
    ).populate('course')

    if (exam) {
      res.json(exam)
    } else {
      res.sendStatus(404)
    }
  }
)

examsRouter.post(
  '/',
  authenticate('coordinator', 'admin'),
  async (req, res) => {
    const body = req.body

    const user = req.user
    const course = await Course.findById(body.courseId)

    if (!(course && user)) {
      res.status(401).json({
        error: 'invalid user or course'
      })
      return
    }

    if (user.role !== 'admin' && user.id !== course.coordinator.toString()) {
      res.status(401).json({
        error: 'coordinator not assigned to course'
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
      endDate: body.endDate,
      slug: slugify(body.label, {
        lower: true,
        strict: true
      })
    } as ExamDocument)

    const savedExam = await exam.save()
    if (course) {
      course.exams = course?.exams.concat(savedExam._id)
      await course.save()
    }
    res.json(await savedExam.populate('course').execPopulate())
  }
)

examsRouter.get('/', async (_req, res) => {
  const exam = await Exam.find({}).populate('course')
  res.json(exam)
})

examsRouter.delete(
  '/:id',
  authenticate('coordinator', 'admin'),
  async (req, res) => {
    await Exam.findByIdAndDelete(req.params.id)
    res.status(204).end()
  }
)

export default examsRouter
