import mongoose, { Document, Schema } from 'mongoose'

export interface ICategory extends Document {
    name: string
    description: string
    image: string
    parent?: mongoose.Types.ObjectId
}

const CategorySchema: Schema<ICategory> = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    image: { type: String, required: false },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
})

const CategoryModel = mongoose.model<ICategory>('Category', CategorySchema)
export default CategoryModel
