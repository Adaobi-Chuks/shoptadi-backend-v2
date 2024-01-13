"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_models_1 = __importDefault(require("../models/order.models"));
const orderItem_models_1 = __importDefault(require("../models/orderItem.models"));
function orderOrderitemAssociation() {
    order_models_1.default.hasMany(orderItem_models_1.default, {
        foreignKey: {
            name: "orderId",
            allowNull: false,
        },
        onDelete: "CASCADE"
    });
    orderItem_models_1.default.belongsTo(order_models_1.default, {
        foreignKey: {
            name: "orderId",
        },
        onDelete: "CASCADE"
    });
}
exports.default = orderOrderitemAssociation;
