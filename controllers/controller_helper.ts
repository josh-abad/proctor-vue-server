import { Request } from 'express'

export interface UserToken {
  username: string;
  id: string;
}

export interface AttemptToken {
  attemptId: string;
  userId: string;
}

const getTokenFrom = (request: Request): string | null => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

export default {
  getTokenFrom
}
