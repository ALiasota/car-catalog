import express from 'express'
import CategoryController from '../../controllers/category'
const router = express.Router()

router.get('/', CategoryController.getAll.middleware, CategoryController.getAll.handler)
router.get('/:id', CategoryController.getCategory.middleware, CategoryController.getCategory.handler)

export default router
