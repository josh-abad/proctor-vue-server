import User, { UserDocument } from '../models/user'

const usersInDb = async (): Promise<UserDocument[]> => {
  const users = await User.find({})
  return users
}

export default {
  usersInDb
}
