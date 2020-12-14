import { Schema, Document, Model, model } from 'mongoose'

export interface ExamResultDocument extends Document {
    questions: string[],
    points: number[],
    user: string,
    course: string 
}

const examResultSchema = new Schema({
  questions: [{
    type: String,
    required: true
  }],
  points: [{
    type: Number,
    required: true
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course'
  }
})

examResultSchema.set('toJSON', {
  transform: (_document: Document, returnedObject: ExamResultDocument) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default model<ExamResultDocument>('ExamResult', examResultSchema)
