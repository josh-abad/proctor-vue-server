import { Request } from 'express'

export interface UserToken {
  email: string;
  id: string;
}

export interface AttemptToken {
  attemptId: string;
  userId: string;
}

const getTokenFrom = (req: Request): string | null => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

export default {
  getTokenFrom
}
