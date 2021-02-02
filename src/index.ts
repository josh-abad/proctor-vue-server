import app from './app'
import http from 'http'
import config from './utils/config'
import logger from './utils/logger'
import { Server } from 'socket.io'
import 'colors'

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
  logger.info(`\x1Bc
${' DONE '.bgGreen.black} ${'Compiled successfully'.green}


  App running at:
  - Local: ${`http://localhost:${config.PORT}`.cyan}

  Note that the development build is not optimized.
  To create a production build, run \x1b[36mnpm run build\x1b[0m.
  
${'No issues found.'.green}
  `)
})

export default io
