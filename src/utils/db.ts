/* eslint-disable no-console */
import mongoose, { ConnectOptions } from 'mongoose'
import config from '../config'

export const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(config.DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions)
        console.log('MongoDB Connected...')
    } catch (err) {
        console.log('Mongoose error: ', err)
    }
}
