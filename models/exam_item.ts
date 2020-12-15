import { Schema, Document, model } from 'mongoose'

export interface ExamItemDocument extends Document {
    question: string,
    choices: string[],
    answer: string,
    examType: 'text' | 'multiple choice' | 'multiple answers',
    course: string
}

const examItemSchema = new Schema({
  question: {
    type: String,
    required: true
  },
  choices: {
    type: [String],
    required: false,
    default: []
  },
  answer: {
    type: String,
    required: true,
    select: false
  },
  examType: {
    type: String,
    required: true
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course'
  }
})

examItemSchema.set('toJSON', {
  transform: (_document: Document, returnedObject: ExamItemDocument) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default model<ExamItemDocument>('ExamItem', examItemSchema)
