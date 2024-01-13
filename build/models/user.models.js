"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_configs_1 = require("../configs/database.configs");
const bcrypt_1 = __importDefault(require("bcrypt"));
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: "Username cannot be null"
            }
        }
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: "Must be a valid email address"
            },
            notNull: {
                msg: "Email cannot be null"
            }
        }
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        set(value) {
            const hashedPassword = bcrypt_1.default.hashSync(value, 10);
            this.setDataValue('password', hashedPassword);
        },
        validate: {
            notNull: {
                msg: "Password cannot be null"
            },
            min: {
                args: [6],
                msg: "Password must be greater than 6 characters"
            }
        }
    },
    role: {
        type: sequelize_1.DataTypes.ENUM('user', 'admin'),
        allowNull: false,
        defaultValue: "user"
    },
}, {
    sequelize: database_configs_1.sequelize,
    tableName: 'users',
    timestamps: true,
    paranoid: true,
});
exports.default = User;
