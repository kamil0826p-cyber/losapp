import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { authRouter } from './routes/auth'
import { config } from './config'

dotenv.config()

function configureCors() {
  return cors({
    origin: config.server.allowedOrigins,
    credentials: true,
  })
}

function setupMiddleware(app: express.Application): void {
  app.use(configureCors())
  app.use(express.json())
}

function setupRoutes(app: express.Application): void {
  app.use('/api/auth', authRouter)
}

function startServer(app: express.Application): void {
  const port = process.env.PORT ? Number(process.env.PORT) : config.server.defaultPort

  app.listen(port, () => {
    console.log(`🔥 Server running on http://localhost:${port}`)
  })
}

function createApp(): express.Application {
  const app = express()

  setupMiddleware(app)
  setupRoutes(app)

  return app
}

const app = createApp()
startServer(app)
