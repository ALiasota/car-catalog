import { Request, Response } from 'express'
import * as yup from 'yup'
import { SendError } from '../../../helpers'
import { controllerWrapper, validation } from '../../../middlewares'
import { UserService } from '../../../services/userService'

const schema = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required(),
})

const registerIntention = async (req: Request, res: Response) => {
    const { email, password } = req.body

    const registeredUser = await UserService.findUserByEmail(email.toLowerCase().trim())

    if (registeredUser) return SendError.CONFLICT(res, 'User already registered', { errorField: 'email' })

    const hashedPassword = await UserService.setHashedPasswordToUserModel(password.trim())

    await UserService.createUser({
        email,
        password: hashedPassword,
    })
    res.redirect('/car')
}

export default {
    middleware: [validation(schema)],
    handler: controllerWrapper(registerIntention),
}
