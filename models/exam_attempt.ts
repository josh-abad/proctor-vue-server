import { Schema, Document, model } from 'mongoose'

export interface ExamAttemptDocument extends Document {
  exam: string,
  user: string,
  status: 'in-progress' | 'completed',
  startDate: Date,
  endDate: Date,
  submittedDate: Date,
  examResult: string
}

const examAttemptSchema = new Schema({
  exam: {
    type: Schema.Types.ObjectId,
    ref: 'Exam'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  submittedDate: {
    type: Date,
    required: false
  },
  examResult: {
    type: Schema.Types.ObjectId,
    ref: 'ExamResult'
  }
})

examAttemptSchema.set('toJSON', {
  transform: (_document: Document, returnedObject: ExamAttemptDocument) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default model<ExamAttemptDocument>('ExamAttempt', examAttemptSchema)
