import * as express from 'express'

declare module 'express-serve-static-core' {
  interface Request {
    io?: import('socket.io').Server
  }
}
