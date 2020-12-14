import User from '../models/user'

const usersInDb = async (): Promise<any[]> => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

export default {
  usersInDb
}
