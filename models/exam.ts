import { Schema, Document, model } from 'mongoose'

export interface ExamDocument extends Document {
    label: string,
    questions: string[],
    length: number,
    duration: number,
    random: boolean,
    course: string,
    maxAttempts: number
}

const examSchema = new Schema({
  label: {
    type: String,
    required: true
  },
  questions: [{
    type: Schema.Types.ObjectId,
    ref: 'ExamItem',
    required: true
  }],
  length: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  random: {
    type: Boolean,
    required: false,
    default: false
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course'
  },
  maxAttempts: {
    type: Number,
    required: true
  }
})

examSchema.set('toJSON', {
  transform: (_document: Document, returnedObject: ExamDocument) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default model<ExamDocument>('Exam', examSchema)
