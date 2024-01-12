import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { MAXAGE, MESSAGES } from "../configs/constants.configs";
import UserService from "../services/user.services";
import IUser from "../interfaces/user.interfaces";
import transporter from "../configs/nodeMailer.configs";
import jwt from "jsonwebtoken";
import userModel from "../models/user.models";
const {
  create,
  findOne,
  generateAuthToken
} = new UserService();
const {
  DUPLICATE_EMAIL,
  DUPLICATE_USERNAME,
  CREATED,
  INVALID_EMAIL,
  INVALID_PASSWORD,
  LOGGEDIN
} = MESSAGES.USER;

export default class UserController {
  async createUser(req: Request, res: Response) {
    const {username, email} = req.body;
    
    //checks if another user with email exists
    if (await findOne({email: email})) {
      //sends an error if the email exists
      return res.status(409)
      .send({
        success: false,
        message: DUPLICATE_EMAIL
      });
    }

    //checks if another user with username exists
    if (await findOne({username: username})) {
      //sends an error if the username exists
      return res.status(409)
      .send({
        success: false,
        message: DUPLICATE_USERNAME
      });
    }
    
    //creates a user if the email and phonenumber doesn't exist
    const createdUser = await create(req.body);
    const token = generateAuthToken(createdUser as any);
    res.cookie("token", token, {
      httpOnly: true, 
      maxAge: MAXAGE * 1000 
    });
    return res.status(201)
      .send({
        success: true,
        message: CREATED,
        user: createdUser
      });
  }

  async login(req: Request, res: Response) {
    const {email, password} = req.body;
    const _user = await findOne({email: email});
    console.log(_user)
    if (!_user) {
      return res.status(400)
        .send({ 
          success: false, 
          message: INVALID_EMAIL
        });
    }
    const validPassword = await bcrypt.compare(password, _user.password);
    if (!validPassword) {
      return res.status(400)
        .send({ 
          Success: false, 
          Message: INVALID_PASSWORD
        });
    }
    const token = generateAuthToken(_user as unknown as IUser);
    res.cookie("token", token, { 
      httpOnly: true, 
      maxAge: MAXAGE * 1000
    });
    return res.status(200).send({
      Success: true,
      Message: LOGGEDIN,
      User: _user 
    });
}
}