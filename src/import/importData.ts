/* eslint-disable no-console */
import fs from 'fs'
import mongoose from 'mongoose'
import { connectDB } from '../utils/db'
import { CategoryService } from '../services/categoryService'
import { CarService } from '../services/carService'

export interface ICarItem {
    name: string
    price: number
    color: string
    description: string
    image: string
    categoryName: string
}

export interface ICategoryItem {
    name: string
    description: string
    image: string
    parent?: string
}

interface IData {
    categories: ICategoryItem[]
    cars: ICarItem[]
}

const importData = async (filePath: string) => {
    try {
        const fileData = fs.readFileSync(filePath, 'utf8')
        const data: IData = JSON.parse(fileData)

        await connectDB()

        await CategoryService.insertCategories(data.categories)

        await CarService.insetCars(data.cars)

        console.log('Data imported successfully')
    } catch (error) {
        console.error('Error importing data:', error)
    } finally {
        await mongoose.disconnect()
    }
}

importData('./data.json')
