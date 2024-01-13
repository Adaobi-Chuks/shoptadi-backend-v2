"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const constants_configs_1 = require("../configs/constants.configs");
const user_services_1 = __importDefault(require("../services/user.services"));
const { create, findOne, generateAuthToken } = new user_services_1.default();
const { DUPLICATE_EMAIL, DUPLICATE_USERNAME, CREATED, INVALID_EMAIL, INVALID_PASSWORD, LOGGEDIN } = constants_configs_1.MESSAGES.USER;
class UserController {
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email } = req.body;
            //checks if another user with email exists
            if (yield findOne({ email: email })) {
                //sends an error if the email exists
                return res.status(409)
                    .send({
                    success: false,
                    message: DUPLICATE_EMAIL
                });
            }
            //checks if another user with username exists
            if (yield findOne({ username: username })) {
                //sends an error if the username exists
                return res.status(409)
                    .send({
                    success: false,
                    message: DUPLICATE_USERNAME
                });
            }
            //creates a user if the email and phonenumber doesn't exist
            const createdUser = yield create(req.body);
            const token = generateAuthToken(createdUser);
            res.cookie("token", token, {
                httpOnly: true,
                maxAge: constants_configs_1.MAXAGE * 1000
            });
            return res.status(201)
                .send({
                success: true,
                message: CREATED,
                user: createdUser
            });
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const _user = yield findOne({ email: email });
            console.log(_user);
            if (!_user) {
                return res.status(400)
                    .send({
                    success: false,
                    message: INVALID_EMAIL
                });
            }
            const validPassword = yield bcrypt_1.default.compare(password, _user.password);
            if (!validPassword) {
                return res.status(400)
                    .send({
                    Success: false,
                    Message: INVALID_PASSWORD
                });
            }
            const token = generateAuthToken(_user);
            res.cookie("token", token, {
                httpOnly: true,
                maxAge: constants_configs_1.MAXAGE * 1000
            });
            return res.status(200).send({
                Success: true,
                Message: LOGGEDIN,
                User: _user
            });
        });
    }
}
exports.default = UserController;
