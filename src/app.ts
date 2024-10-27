import cors from 'cors'
import express, { ErrorRequestHandler } from 'express'
import apiRoutes from './api'
import config from './config'
import { SendError } from './helpers'
import { connectDB } from './utils/db'
import { SeedService } from './services/seedService'
import mustacheExpress from 'mustache-express'
import path from 'path'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('mustache', mustacheExpress())
app.set('view engine', 'mustache')
app.set('views', path.join(__dirname, 'views'))

// Routes
app.use(apiRoutes)

// Unmatched routes
app.all('*', (req, res) => SendError.NOT_FOUND(res, 'Ohh you are lost, read the API documentation to find your way back home :)'))

const errorHandler: ErrorRequestHandler = (err, req, res, _next): void => {
    const { status = 500, message = 'Sever error' } = err
    res.status(status).json({ code: status, success: false, message })
}

app.use(errorHandler)

const port = config.PORT

const startServer = async () => {
    await connectDB()
    await SeedService.insertTestCategories()
    await SeedService.insertTestCars()
    // eslint-disable-next-line no-console
    app.listen(port, () => console.log(`Server runs on the port ${port}. Env : ${process.env.ENV}`))
}

startServer()
