import { Request, Response } from 'express'
import { controllerWrapper } from '../../middlewares'
import { CarService } from '../../services/carService'

const getAllCars = async (req: Request, res: Response) => {
    const cars = await CarService.getAllCars()
    res.render('cars', { cars })
}

export default {
    middleware: [],
    handler: controllerWrapper(getAllCars),
}
