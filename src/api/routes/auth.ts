import express from 'express'
import LoginController from '../../controllers/auth/login'
import RegisterController from '../../controllers/auth/register'

const router = express.Router()

router.get('/login', LoginController.getLogin.handler)
router.post('/login', LoginController.login.middleware, LoginController.login.handler)
router.get('/register', RegisterController.getRegister.handler)
router.post('/register', RegisterController.register.middleware, RegisterController.register.handler)

export default router
