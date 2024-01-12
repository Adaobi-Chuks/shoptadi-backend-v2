import { MAXAGE, SECRET } from "../configs/constants.configs";
import IUser from "../interfaces/user.interfaces";
import User from "../models/user.models";
import jwt from "jsonwebtoken";
const secret = process.env.SECRET!;

export default class UserService {
    async create(data: any) {
        const user = await User.create(data);
        return await User.findByPk(user.id, { attributes: {exclude: ["password"]} });
    }

    async findOne(filter: any) {
        const user = await User.findOne({ where: filter });
        return user;
    }

    generateAuthToken (user: IUser) {
        return jwt.sign({
            id: user.id,
            email: user.email,
            role: user.role
        }, secret, {
            expiresIn: MAXAGE
        });
    }
}