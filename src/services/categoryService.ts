/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from 'mongoose'
import { ICategoryItem } from '../import/importData'
import CategoryModel, { ICategory } from '../models/Category'
import { CarService } from './carService'
import { ICar } from '../models/Car'
import Mustache from 'mustache'
import fs from 'fs'
import path from 'path'

export class CategoryService {
    static async getCategoryCount() {
        return await CategoryModel.countDocuments()
    }

    static async insertCategories(categories: ICategoryItem[]) {
        for (const categoryItem of categories) {
            const { name, description, image, parent } = categoryItem

            let category = await CategoryModel.findOne({ name })

            if (category) {
                category.description = description
                category.image = image
                if (parent) category.parent = await this.checkParent(parent)
            } else {
                category = new CategoryModel({ name, description, image })
                if (parent) category.parent = await this.checkParent(parent)
            }
            await category.save()
        }
    }

    static async checkParent(parentName: string) {
        let parentCategory = await CategoryModel.findOne({ name: parentName })
        if (parentCategory) return parentCategory._id
        else {
            parentCategory = new CategoryModel({ name: parent })
            await parentCategory.save()
            return parentCategory._id
        }
    }

    static async getCategory(id: string) {
        const category = await CategoryModel.findById(id).populate('parent').exec()

        if (!category) {
            throw new Error('Category not found')
        }
        let path = ''
        if (category.parent) {
            const categoriesArr = await CategoryService.getParentCategories(category.parent)
            path = categoriesArr.join('/')
        }

        return { description: category.description, name: category.name, image: category.image, path }
    }

    static async getCategoryByName(name: string) {
        return await CategoryModel.findOne({ name })
    }

    static async getParentCategories(categoryId: mongoose.Types.ObjectId) {
        const category = await CategoryModel.findById(categoryId).populate('parent').exec()
        if (!category) return []

        const parentNames: string[] = []
        if (category.parent) {
            const parentCategories = await this.getParentCategories(category.parent)
            parentNames.push(...parentCategories)
        }

        parentNames.push(category.name)
        return parentNames
    }

    static async getCategoriesWithCars() {
        const categories = await CategoryModel.find()
        const categoriesMap = new Map()

        const categoryPromises = categories.map(async category => {
            const cars = await CarService.getCarByCategory(category._id)
            categoriesMap.set(category._id.toString(), {
                ...category.toObject(),
                cars,
                children: [],
            })
        })

        await Promise.all(categoryPromises)

        categories.forEach(category => {
            if (category.parent) {
                const parentCategory = categoriesMap.get(category.parent.toString())
                if (parentCategory) {
                    if (!parentCategory.children.find((child: ICategory) => child._id.equals(category._id))) {
                        parentCategory.children.push(categoriesMap.get(category._id.toString()))
                    }
                }
            }
        })

        const rootCategories = Array.from(categoriesMap.values()).filter(cat => !cat.parent)

        const renderedHtml = this.generateHtml(rootCategories)
        return renderedHtml
    }

    static generateHtml(categories: any[]) {
        const categoriesItemTemplatePath = path.join(__dirname, '..', 'views/categoriesItem.mustache')
        const categoriesItemTemplate = fs.readFileSync(categoriesItemTemplatePath, 'utf8')
        return categories
            .map(category => {
                let html = Mustache.render(categoriesItemTemplate, {
                    _id: category._id,
                    name: category.name,
                    cars: category.cars,
                })
                if (category.children.length > 0) {
                    html += this.generateHtml(category.children)
                }
                return html
            })
            .join('')
    }
}
