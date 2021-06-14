import { Router } from 'express'
import Course from '@/models/course'
import Exam, { ExamDocument } from '@/models/exam'
import ExamAttempt from '@/models/exam-attempt'
import { authenticate } from '@/utils/middleware'
import slugify from 'slugify'

const examsRouter = Router()

examsRouter.post('/', authenticate, async (req, res) => {
  const body = req.body

  const user = req.user
  const course = await Course.findById(body.courseId)

  if (!(course && user)) {
    res.status(401).json({
      error: 'invalid user or course'
    })
    return
  }

  if (user.role === 'student') {
    res.status(401).json({
      error: 'role does not permit creation of new exams'
    })
    return
  }

  if (user.role !== 'admin' && user.id !== course.coordinator.toString()) {
    res.status(401).json({
      error: 'coordinator not assigned to course'
    })
    return
  }

  const examNameExists = await Exam.exists({
    label: { $regex: body.label, $options: 'i' },
    course: course?._id
  })
  if (examNameExists) {
    res.status(401).send({
      error: `Exam name '${body.name}' already taken.`
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
    slug: slugify(body.lablel, {
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
})

examsRouter.get('/', async (_req, res) => {
  const exam = await Exam.find({}).populate('course')
  res.json(exam)
})

examsRouter.get('/:id', async (req, res) => {
  const exam = await Exam.findById(req.params.id).populate('course')
  if (exam) {
    res.json(exam)
  } else {
    res.status(404).end()
  }
})

examsRouter.get('/:exam/taken-by/:user', async (req, res) => {
  const { exam, user } = req.params
  const count = await ExamAttempt.countDocuments({ exam, user })
  res.json({ isTaken: count > 0 })
})

examsRouter.get('/:exam/attempts/:user', async (req, res) => {
  const { exam, user } = req.params
  const examAttemptsByUser = await ExamAttempt.find({ exam, user }).populate({
    path: 'exam',
    populate: { path: 'course' }
  })
  res.json(examAttemptsByUser)
})

examsRouter.put('/:id', async (req, res) => {
  const body = req.body

  const exam = {
    label: body.label,
    questions: body.questions,
    length: body.length || body.questions.length,
    duration: body.duration,
    random: body.random,
    course: body.courseId,
    maxAttempts: body.maxAttempts
  }

  const updatedExam = await Exam.findByIdAndUpdate(req.params.id, exam, {
    new: true,
    runValidators: true,
    context: 'query'
  })
  res.json(updatedExam)
})

examsRouter.delete('/:id', async (req, res) => {
  await Exam.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

export default examsRouter
