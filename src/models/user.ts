import { Schema, Document, model } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

export interface UserDocument extends Document {
  name: {
    first: string,
    last: string
  },
  fullName: string,
  passwordHash: string,
  courses: string[],
  email: string,
  verified: boolean,
  avatarUrl: string,
  role: 'student' | 'coordinator' | 'admin'
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
  courses: [{
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: false,
    default: []
  }],
  email: {
    type: String,
    required: true,
    unique: true
  },
  verified: {
    type: Boolean,
    required: true
  },
  avatarUrl: {
    type: String,
    required: true
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

userSchema.set('toJSON', {
  getters: true,
  transform: (_document: Document, returnedObject: UserDocument) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default model<UserDocument>('User', userSchema)
