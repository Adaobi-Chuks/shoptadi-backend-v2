"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_models_1 = __importDefault(require("../models/order.models"));
const user_models_1 = __importDefault(require("../models/user.models"));
function userOrderAssociation() {
    user_models_1.default.hasMany(order_models_1.default, {
        foreignKey: {
            name: "userId",
            allowNull: false,
        },
        onDelete: "CASCADE"
    });
    order_models_1.default.belongsTo(user_models_1.default, {
        foreignKey: {
            name: "userId",
        },
        onDelete: "CASCADE"
    });
}
exports.default = userOrderAssociation;
