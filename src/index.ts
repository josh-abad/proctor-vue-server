import app from './app'
import http from 'http'
import config from './utils/config'
import logger from './utils/logger'
import { Server } from 'socket.io'

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST']
  }
})

app.use((request, _response, next) => {
  request.io = io
  next()
})

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)	
})

export default io
