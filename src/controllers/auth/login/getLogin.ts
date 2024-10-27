import { Request, Response } from 'express'
import { controllerWrapper } from '../../../middlewares'

const getLogin = async (req: Request, res: Response) => {
    res.render('login')
}

export default {
    middleware: [],
    handler: controllerWrapper(getLogin),
}
