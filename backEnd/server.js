import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { logger } from 'logger-express'
import usersRoutes from './config/routes/usersRoutes.js'
import loginRoutes from './config/routes/loginRoutes.js'

dotenv.config()
const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(cors())
app.use(logger())

app.use('/api/v1', usersRoutes)
app.use('/api/v1', loginRoutes)

app.listen(PORT, () => {
  console.log(`Servidor ejecutandose en el puerto http://localhost:${PORT}`)
})
