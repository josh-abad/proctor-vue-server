import { Answer, AttemptStatus } from '@/types'
import { Schema, Document, model } from 'mongoose'

const answerSchema = new Schema({
  examItem: {
    type: String,
    required: true
  },
  answer: [
    {
      type: String,
      required: true
    }
  ],
  hasPlagiarism: {
    type: Boolean,
    default: false
  }
})

export interface ExamAttemptDocument extends Document {
  exam: string
  user: string
  status: AttemptStatus
  startDate: Date
  endDate: Date
  submittedDate: Date
  examResult: string
  score: number
  examTotal: number
  warnings: number
  answers: Answer[]
  pendingGrade: boolean
  examItems: string[]
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
  },
  score: {
    type: Number,
    required: false,
    default: 0
  },
  examTotal: {
    type: Number,
    required: true
  },
  warnings: {
    type: Number,
    default: 0
  },
  pendingGrade: {
    type: Boolean,
    required: true
  },
  answers: [answerSchema],
  /**
   * So this should be type ObjectId, referencing `ExamItem`. But while there's
   * an exam item schema, it doesn't exist as a model. Using the schema
   * directly here means I'll have two copies of an exam item. This works like
   * normal MongoDB reference fields except I can't do
   * `ExamAttempt.find(...).populate('examItems')`. I have to map the ID to the
   * actual exam item in the exam object.
   *
   * ```
   * const attempt = await ExamAttempt.findById(...)
   * const exam = await Exam.findById(attempt.exam)
   * const examItems = attempt.examItems.map(id => {
   *     return exam.examItems.find(e => e.id === id))
   * })
   * ```
   *
   * Or perform the map client-side since `attempt.exam` should be populated.
   */
  examItems: [
    {
      type: String,
      required: false
    }
  ]
})

examAttemptSchema.pre(/^find.*/, next => {
  ExamAttempt.updateMany(
    {
      status: 'in-progress',
      endDate: {
        $lt: new Date()
      }
    },
    {
      status: 'expired'
    },
    {
      new: true
    }
  ).then(() => {
    next()
  })
})

examAttemptSchema.set('toJSON', {
  transform: (_document: Document, returnedObject: ExamAttemptDocument) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const ExamAttempt = model<ExamAttemptDocument>('ExamAttempt', examAttemptSchema)
export default ExamAttempt
