import { Router } from 'express'
import Course from '../models/course'
import User from '../models/user'

const coursesRouter = Router()

coursesRouter.post('/', async (request, response) => {
  const body = request.body

  const coordinator = await User.findById(body.coordinatorId)
  if (coordinator?.role !== 'coordinator') {
    response.status(401).send({
      error: 'invalid coordinator id'
    })
    return
  }

  const course = new Course({
    name: body.name,
    coordinator: coordinator._id
  })

  coordinator.courses.push(course._id)
  await coordinator.save()

  const savedCourse = await course.save()
  response.json(savedCourse.toJSON())
})

coursesRouter.get('/', async (request, response) => {
  const coordinatorId = request.query.coordinatorId
  if (coordinatorId) {
    const coursesByCoordinator = await Course.find({ coordinator: coordinatorId as string }).populate('coordinator')
    response.json(coursesByCoordinator)
    return
  }
  const courses = await Course.find({}).populate('coordinator')
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
