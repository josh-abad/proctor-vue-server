import { Router } from 'express'
import Course from '../models/course'
import Exam from '../models/exam'

const examsRouter = Router()

examsRouter.post('/', async (request, response) => {
  const body = request.body

  const course = await Course.findById(body.courseId)

  const exam = new Exam({
    label: body.label,
    examItems: body.examItems,
    length: body.length || body.examItems.length,
    duration: body.duration,
    random: body.random,
    course: course?._id,
    maxAttempts: body.maxAttempts
  })

  const savedExam = await exam.save()
  if (course) {
    course.exams = course?.exams.concat(savedExam._id)
    await course.save()
  }
  response.json(savedExam.toJSON())
})

examsRouter.get('/', async (_request, response) => {
  const exam = await Exam.find({}).populate('course')
  response.json(exam)
})

examsRouter.get('/:id', async (request, response) => {
  const exam = await Exam.findById(request.params.id)
  if (exam){
    response.json(exam)
  } else {
    response.status(404).end()
  }
})

examsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const exam = {
    label: body.label,
    questions: body.questions,
    length: body.length || body.questions.length,
    duration: body.duration,
    random: body.random,
    course: body.courseId,
    maxAttempts: body.maxAttempts
  }

  const updatedExam = await Exam.findByIdAndUpdate(request.params.id, exam, {
    new: true,
    runValidators: true,
    context: 'query'
  })
  response.json(updatedExam)
})

examsRouter.delete('/:id', async (request, response) => {
  await Exam.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

export default examsRouter
