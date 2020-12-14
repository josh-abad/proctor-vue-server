import { Schema, Document, model } from 'mongoose'

export interface UserDocument extends Document {
    name: {
      first: string,
      last: string
    },
    username: string,
    passwordHash: string,
    courses: string[]
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
  username: {
    type: String,
    required: true
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
  }]
})

userSchema.virtual('fullName').get(function (this: UserDocument) {
  return `${this.name.first} ${this.name.last}`
})

userSchema.set('toJSON', {
  transform: (_document: Document, returnedObject: UserDocument) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default model<UserDocument>('User', userSchema)
