import { Schema, Document, model } from 'mongoose'

export interface ExamResultDocument extends Document {
  exam: string,
  user: string,
  scores: Map<string, number>
}

const examResultSchema = new Schema({
  exam: {
    type: Schema.Types.ObjectId,
    ref: 'Exam'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  scores: [{
    type: Map,
    of: Number
  }]
})

examResultSchema.set('toJSON', {
  transform: (_document: Document, returnedObject: ExamResultDocument) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default model<ExamResultDocument>('ExamResult', examResultSchema)
