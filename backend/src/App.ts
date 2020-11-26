import express from 'express'
import routes from './routes'
import authRoutes from './controllers/AuthController'

class App {
  public express: express.Application;

  public constructor () {
    this.express = express()
    this.middlewares()
    this.database()
    this.routes()
  }

  private middlewares () {
    this.express.use(express.json())
  }

  private database () {
    require('./connection/mongodb')
  }

  private routes (): void {
    this.express.use(routes)
    this.express.use(authRoutes)
  }
}

export default new App().express
