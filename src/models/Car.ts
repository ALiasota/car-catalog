import mongoose, { Document, Schema } from 'mongoose'

export interface ICar extends Document {
    name: string
    price: number
    color: string
    description: string
    image: string
    category: mongoose.Types.ObjectId
}

const CarSchema: Schema<ICar> = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    color: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
})

const CarModel = mongoose.model<ICar>('Car', CarSchema)
export default CarModel
