import UserModel, { IUser } from '../models/User'
import bcrypt from 'bcryptjs'

export class UserService {
    static async findUserByEmail(email: string) {
        const user = await UserModel.findOne({ email })
        return user
    }

    static async setHashedPasswordToUserModel(password: string) {
        return await bcrypt.hash(password.trim(), 10)
    }

    static async createUser(fields: Partial<IUser>) {
        const user = await UserModel.create(fields)
        return user
    }
}
