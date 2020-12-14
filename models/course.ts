import { Schema, Document, model } from 'mongoose'

export interface CourseDocument extends Document {
   name: string
}

const courseSchema = new Schema({
  name: {
    type: String,
    required: true
  }
})

courseSchema.set('toJSON', {
  transform: (_document: Document, returnedObject: CourseDocument) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default model<CourseDocument>('Course', courseSchema)
