import { Schema, Document, model } from 'mongoose'

export interface Score {
  examItem: string
  points: number
}

export interface ExamResultDocument extends Document {
  exam: string
  user: string
  scores: Score[]
  attempt: string
}

const scoreSchema = new Schema({
  examItem: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    required: true
  }
})

const examResultSchema = new Schema({
  exam: {
    type: Schema.Types.ObjectId,
    ref: 'Exam'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  scores: [scoreSchema],
  attempt: {
    type: Schema.Types.ObjectId,
    ref: 'ExamAttempt'
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
