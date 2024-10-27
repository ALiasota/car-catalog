import { Request, Response } from 'express'
import * as yup from 'yup'
import bcrypt from 'bcryptjs'
import { SendError } from '../../../helpers'
import { controllerWrapper, validation } from '../../../middlewares'
import { UserService } from '../../../services/userService'

const schema = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required(),
})

const loginConfirm = async (req: Request, res: Response) => {
    const { email, password } = req.body

    const user = await UserService.findUserByEmail(email)

    if (!user) return SendError.BAD_REQUEST(res, 'User not found', { errorId: 'user_not_registered' })

    const isPasswordValid = await bcrypt.compare(password.trim(), user.password as string)
    if (!isPasswordValid) return SendError.BAD_REQUEST(res, 'wrong password', { errorId: 'validation_error' })

    res.redirect('/car')
}

export default {
    middleware: [validation(schema)],
    handler: controllerWrapper(loginConfirm),
}
