import { Request, Response } from 'express'
import { controllerWrapper } from '../../../middlewares'

const getRegister = async (req: Request, res: Response) => {
    res.render('register')
}

export default {
    middleware: [],
    handler: controllerWrapper(getRegister),
}
