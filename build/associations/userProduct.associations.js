"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_models_1 = __importDefault(require("../models/user.models"));
const product_models_1 = __importDefault(require("../models/product.models"));
function userProductAssociation() {
    user_models_1.default.hasMany(product_models_1.default, {
        foreignKey: {
            name: "userId",
            allowNull: false
        },
        onDelete: "CASCADE"
    });
    product_models_1.default.belongsTo(user_models_1.default, {
        foreignKey: {
            name: "userId",
        },
        onDelete: "CASCADE"
    });
}
exports.default = userProductAssociation;
