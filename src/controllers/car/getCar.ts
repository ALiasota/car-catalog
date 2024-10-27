/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express'
import { controllerWrapper } from '../../middlewares'
import { CarService } from '../../services/carService'

const getCar = async (req: Request, res: Response) => {
    const { id } = req.params
    const car = await CarService.getCar(id)
    res.render('car', { car })
}

export default {
    middleware: [],
    handler: controllerWrapper(getCar),
}
