import { Router } from 'express'
import Course, { CourseDocument } from '../models/course'
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
  response.json(await savedCourse.populate('coordinator').execPopulate())
})

coursesRouter.get('/', async (request, response) => {
  const userId = request.query.userId
  if (userId) {
    const user = await User.findById(userId)
    if (user) {
      const coursesByUser: CourseDocument[] = []
      for (const courseId of user.courses) {
        const course = await Course.findById(courseId)
        if (course) {
          coursesByUser.push(course)
        } else {
          user.courses = user.courses.filter(id => id !== courseId)
          await user.save()
        }
      }
      response.json(coursesByUser)
      return
    }
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
  const course = await Course.findById(request.params.id)
  console.log(course)
  
  const coordinator = await User.findById(course?.coordinator)
  if (coordinator) {
    coordinator.courses = coordinator.courses.filter(courseId => courseId !== course?._id)
    await coordinator?.save()
  }
  
  await course?.delete()
  response.status(204).end()
  
})

export default coursesRouter
