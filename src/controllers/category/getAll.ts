import { Request, Response } from 'express'
import { controllerWrapper } from '../../middlewares'
import { CategoryService } from '../../services/categoryService'

const getAllCategories = async (req: Request, res: Response) => {
    const categories = await CategoryService.getCategoriesWithCars()
    res.render('categories', { categories })
}

export default {
    middleware: [],
    handler: controllerWrapper(getAllCategories),
}
