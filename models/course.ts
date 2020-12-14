import { Schema, Document, Model, model } from 'mongoose'

interface Course extends Document {
   name: string
}

const courseSchema = new Schema({
  name: {
    type: String,
    required: true
  }
})

courseSchema.set('toJSON', {
  transform: (_document: Document, returnedObject: Course) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Course: Model<Course> = model('Course', courseSchema)

export default Course
