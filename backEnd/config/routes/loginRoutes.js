import express from 'express'
import { loginUser } from '../../src/API/V1/controllers/loginController.js'

const router = express.Router()

router.post('/login', loginUser)

export default router
