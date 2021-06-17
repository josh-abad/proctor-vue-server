import { Schema, Document, model } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import Course from './course'
import ExamAttempt from './exam-attempt'
import ExamResult from './exam-result'
import { Role } from '@/types'

export interface UserDocument extends Document {
  name: {
    first: string
    last: string
  }
  fullName: string
  passwordHash?: string
  courses: string[]
  recentCourses: string[]
  email: string
  verified: boolean
  active: boolean
  avatarUrl: string
  referenceImageUrl?: string
  role: Role
}

const userSchema = new Schema({
  name: {
    first: {
      type: String,
      required: true
    },
    last: {
      type: String,
      required: true
    }
  },
  passwordHash: {
    type: String,
    required: true,
    select: false
  },
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: false,
      default: []
    }
  ],
  recentCourses: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: false,
      default: []
    }
  ],
  email: {
    type: String,
    required: true,
    unique: true
  },
  verified: {
    type: Boolean,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  },
  avatarUrl: {
    type: String,
    required: true
  },
  referenceImageUrl: {
    type: String,
    required: false
  },
  role: {
    type: String,
    required: true
  }
})

userSchema.plugin(uniqueValidator)

userSchema.virtual('fullName').get(function (this: UserDocument) {
  return `${this.name.first} ${this.name.last}`
})

userSchema.post('findOneAndDelete', async (user: UserDocument) => {
  await Promise.all([
    Course.updateMany(
      {
        _id: {
          $in: user.courses
        }
      },
      {
        $pull: {
          studentsEnrolled: user._id
        }
      }
    ),
    ExamAttempt.deleteMany({ user: user._id }),
    ExamResult.deleteMany({ user: user._id })
  ])
})

userSchema.set('toJSON', {
  getters: true,
  transform: (_document: Document, returnedObject: UserDocument) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default model<UserDocument>('User', userSchema)
