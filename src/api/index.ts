import express from 'express'
import carRouter from './routes/car'
import categoryRouter from './routes/category'
import authRouter from './routes/auth'

const router = express.Router()

router.use('/car', carRouter)
router.use('/category', categoryRouter)
router.use('/auth', authRouter)

router.get('/', (_, res) => {
    res.send('Backend API')
})

export default router
