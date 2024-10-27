import { Request, Response } from 'express'
import * as yup from 'yup'
import { controllerWrapper, validation } from '../../middlewares'
import { CarService } from '../../services/carService'

const schema = yup.object().shape({
    name: yup.string().required(),
    price: yup.number().required(),
    color: yup.string().required(),
    description: yup.string().required(),
    categoryName: yup.string().required(),
})

const getCar = async (req: Request, res: Response) => {
    const { id } = req.params

    const { name, price, color, description, categoryName } = req.body
    await CarService.updateCar(id, { name, price, color, description, categoryName })
    res.redirect('/car')
}

export default {
    middleware: [validation(schema)],
    handler: controllerWrapper(getCar),
}
