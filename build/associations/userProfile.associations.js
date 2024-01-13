"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const profile_models_1 = __importDefault(require("../models/profile.models"));
const user_models_1 = __importDefault(require("../models/user.models"));
function userProfileAssociation() {
    user_models_1.default.hasOne(profile_models_1.default, {
        foreignKey: {
            name: "userId",
            allowNull: false,
        },
        onDelete: "CASCADE"
    });
    profile_models_1.default.belongsTo(user_models_1.default, {
        foreignKey: {
            name: "userId",
        },
        onDelete: "CASCADE"
    });
}
exports.default = userProfileAssociation;
