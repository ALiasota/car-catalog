import { Request, Response } from 'express'
import { controllerWrapper } from '../../middlewares'
import { CategoryService } from '../../services/categoryService'

const getCategory = async (req: Request, res: Response) => {
    const { id } = req.params
    const category = await CategoryService.getCategory(id)
    res.render('category', { category })
}

export default {
    middleware: [],
    handler: controllerWrapper(getCategory),
}
