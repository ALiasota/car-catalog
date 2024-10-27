import express from 'express'
import CarController from '../../controllers/car'
const router = express.Router()

router.get('/:id', CarController.getCar.middleware, CarController.getCar.handler)
router.get('/', CarController.getAll.middleware, CarController.getAll.handler)
router.post('/:id', CarController.updateCar.middleware, CarController.updateCar.handler)

export default router
