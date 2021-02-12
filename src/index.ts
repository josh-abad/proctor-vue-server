import app from './app'
import http from 'http'
import config from './utils/config'
import logger from './utils/logger'

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`App served at http://localhost:${config.PORT}`)	
})
