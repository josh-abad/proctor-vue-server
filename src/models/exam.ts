import { Schema, Document, model } from 'mongoose'
import Course from './course'
import ExamAttempt from './exam-attempt'
import ExamResult from './exam-result'

interface ExamItem {
  question: string
  choices: string[]
  answer: string[]
  questionType: 'text' | 'multiple choice' | 'multiple answers'
}

const examItemSchema = new Schema({
  question: {
    type: String,
    required: true
  },
  choices: [
    {
      type: String,
      required: false,
      default: []
    }
  ],
  answer: [
    {
      type: String,
      required: true
    }
  ],
  questionType: {
    type: String,
    required: true
  }
})

export interface ExamDocument extends Document {
  label: string
  examItems: ExamItem[]
  length: number
  duration: number
  random: boolean
  course: string
  maxAttempts: number
  week: number
  startDate: Date
  endDate: Date
}

const examSchema = new Schema({
  label: {
    type: String,
    required: true
  },
  examItems: [examItemSchema],
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
  },
  week: {
    type: Number,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  }
})

examSchema.post('findOneAndDelete', async (exam: ExamDocument) => {
  await Promise.all([
    Course.updateOne({ _id: exam.course }, { $pull: { exams: exam._id } }),
    ExamAttempt.deleteMany({ exam: exam._id }),
    ExamResult.deleteMany({ exam: exam._id })
  ])
})

examSchema.set('toJSON', {
  transform: (_document: Document, returnedObject: ExamDocument) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default model<ExamDocument>('Exam', examSchema)
