import { Schema, Document, model } from 'mongoose'

export interface CourseDocument extends Document {
  name: string;
  description: string;
  exams: string[];
  coordinator: string;
  studentsEnrolled: string[];
  weeks: number;
}

const courseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  exams: [{
    type: Schema.Types.ObjectId,
    ref: 'Exam'
  }],
  coordinator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  studentsEnrolled: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  weeks: {
    type: Number,
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
