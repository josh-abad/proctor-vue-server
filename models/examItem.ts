
import { Schema, Document, Model, model } from 'mongoose'

interface ExamItem extends Document {
    question: string,
    choices: string[],
    answer: string,
    examType: 'text' | 'multiple choice' | 'multiple answers',
    courseId: string
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
    required: true
  },
  examType: {
    type: String,
    required: true
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'Course'
  }
})

examItemSchema.set('toJSON', {
  transform: (_document: Document, returnedObject: ExamItem) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const ExamItemModel: Model<ExamItem> = model('ExamItem', examItemSchema)

export default ExamItemModel
