"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_model_1 = __importDefault(require("../models/category.model"));
const product_models_1 = __importDefault(require("../models/product.models"));
function productCategoryAssociation() {
    category_model_1.default.hasMany(product_models_1.default, {
        foreignKey: {
            name: "categoryId",
            allowNull: false
        },
        onDelete: "CASCADE"
    });
    product_models_1.default.belongsTo(category_model_1.default, {
        foreignKey: {
            name: "categoryId",
        },
        onDelete: "CASCADE"
    });
}
exports.default = productCategoryAssociation;
