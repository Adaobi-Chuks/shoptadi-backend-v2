"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orderOrderitem_associations_1 = __importDefault(require("./orderOrderitem.associations"));
const productCategory_associations_1 = __importDefault(require("./productCategory.associations"));
const productImage_associations_1 = __importDefault(require("./productImage.associations"));
const userOrder_associations_1 = __importDefault(require("./userOrder.associations"));
const userProduct_associations_1 = __importDefault(require("./userProduct.associations"));
const userProfile_associations_1 = __importDefault(require("./userProfile.associations"));
function createAssociations() {
    (0, userProfile_associations_1.default)();
    (0, userProduct_associations_1.default)();
    (0, productImage_associations_1.default)();
    (0, productCategory_associations_1.default)();
    (0, userOrder_associations_1.default)();
    (0, orderOrderitem_associations_1.default)();
}
exports.default = createAssociations;
