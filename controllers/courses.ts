import { Response, Router } from 'express'
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
    description: body.description,
    coordinator: coordinator._id,
    weeks: body.weeks
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

coursesRouter.put('/:courseId', async (request, response): Promise<Response | void> => {
  const body = request.body
  const course = await Course.findById(request.params.courseId)

  if (!course) {
    return response.status(404).end()
  }

  const userId = body.userId
  if (userId) {
    const user = await User.findById(userId)

    if (!user) {
      return response.status(401).json({
        error: 'User not found.'
      })
    }

    if (user.role !== 'student') {
      return response.status(401).json({
        error: 'User is not a student.'
      })
    }

    if (user.courses.includes(course.id)) {
      return response.status(401).json({
        error: 'Student is already enrolled in course.'
      })
    }

    user.courses.push(course._id)
    await user.save()

    course.studentsEnrolled.push(user._id)
    const updatedCourse = await course.save()
    return response.json(await updatedCourse.populate('coordinator').execPopulate())
  }
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
