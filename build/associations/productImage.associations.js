"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_models_1 = __importDefault(require("../models/product.models"));
const image_models_1 = __importDefault(require("../models/image.models"));
function productImageAssociation() {
    product_models_1.default.hasMany(image_models_1.default, {
        foreignKey: {
            name: "productId",
            allowNull: false
        },
        onDelete: "CASCADE"
    });
    image_models_1.default.belongsTo(product_models_1.default, {
        foreignKey: {
            name: "productId",
        },
        onDelete: "CASCADE"
    });
}
exports.default = productImageAssociation;
