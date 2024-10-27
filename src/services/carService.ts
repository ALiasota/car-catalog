/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ICarItem } from '../import/importData'
import CarModel from '../models/Car'
import { CategoryService } from './categoryService'

export class CarService {
    static async getCarCount() {
        return await CarModel.countDocuments()
    }

    static async insetCars(cars: ICarItem[]) {
        for (const carItem of cars) {
            const { name, price, color, description, image, categoryName } = carItem

            let car = await CarModel.findOne({ name })
            const category = await CategoryService.checkParent(categoryName)
            if (car) {
                car.description = description
                car.image = image
                car.price = price
                car.color = color
                car.category = category
            } else {
                car = new CarModel({
                    name,
                    price,
                    color,
                    description,
                    image,
                    category,
                })
            }

            await car.save()
        }
    }

    static async getCar(id: string) {
        const car = await CarModel.findById(id).populate('category').exec()

        if (!car) {
            throw new Error('Car not found')
        }
        const categoriesArr = await CategoryService.getParentCategories(car.category)
        const path = categoriesArr.join('/')

        return { price: car.price, name: car.name, color: car.color, description: car.description, image: car.image, path }
    }

    static async getCarByCategory(categoryId: string) {
        const cars = await CarModel.find({ category: categoryId })

        return cars
    }

    static async getAllCars() {
        return await CarModel.find().populate('category')
    }

    static async updateCar(id: string, fields: Partial<ICarItem>) {
        const category = await CategoryService.getCategoryByName(fields.categoryName!)

        if (!category) {
            throw new Error('Category not found')
        }

        await CarModel.findByIdAndUpdate(id, { name: fields.name, price: fields.price, color: fields.color, description: fields.description, category })
    }
}
