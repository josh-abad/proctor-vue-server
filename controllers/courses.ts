import { Router } from 'express'
import Course from '../models/course'

const coursesRouter = Router()

coursesRouter.post('/', async (request, response) => {
  const body = request.body

  const course = new Course({
    name: body.name
  })
  const savedCourse = await course.save()
  response.json(savedCourse.toJSON())
})

coursesRouter.get('/', async (_request, response) => {
  const courses = await Course.find({})
  response.json(courses)
})

coursesRouter.get('/:id', async (request, response) => {
  const course = await Course.findById(request.params.id)
  if (course){
    response.json(course)
  } else {
    response.status(404).end()
  }
})

coursesRouter.put('/:id', async (request, response) => {
  const body = request.body

  const course = {
    name: body.name
  }

  const updatedCourse = await Course.findByIdAndUpdate(request.params.id, course, {
    new: true,
    runValidators: true,
    context: 'query'
  })
  response.json(updatedCourse)
})

coursesRouter.delete('/:id', async (request, response) => {
  await Course.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

export default coursesRouter
