import { Router } from 'express'
import Course from '../models/course'
import ExamItem from '../models/examItem'

const examItemsRouter = Router()

examItemsRouter.post('/', async (request, response) => {
  const body = request.body

  const course = await Course.findById(body.courseId)

  const examItem = new ExamItem({
    question: body.question,
    choices: body.choices,
    answer: body.answer,
    examType: body.examType,
    course: course?._id
  })
  const savedExamItem = await examItem.save()
  response.json(savedExamItem.toJSON())
})

examItemsRouter.get('/', async (_request, response) => {
  const examItem = await ExamItem.find({}).populate('course')
  response.json(examItem)
})

examItemsRouter.get('/:id', async (request, response) => {
  const examItem = await ExamItem.findById(request.params.id)
  if (examItem){
    response.json(examItem)
  } else {
    response.status(404).end()
  }
})

examItemsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const examItem = {
    question: body.question,
    choices: body.choices,
    answer: body.answer,
    examType: body.examType,
    courseId: body.courseId
  }

  const updatedExamItem = await ExamItem.findByIdAndUpdate(request.params.id, examItem, {
    new: true,
    runValidators: true,
    context: 'query'
  })
  response.json(updatedExamItem)
})

examItemsRouter.delete('/:id', async (request, response) => {
  await ExamItem.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

export default examItemsRouter
