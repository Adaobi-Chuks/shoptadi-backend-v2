"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATABASE_URI = exports.DATABASES = exports.SALTROUNDS = exports.MESSAGES = exports.basePath = exports.MAXAGE = exports.SECRET = exports.PORT = void 0;
const DATABASE_URI = process.env.DATABASE_URI;
exports.DATABASE_URI = DATABASE_URI;
const PORT = process.env.PORT || 9871;
exports.PORT = PORT;
const SECRET = process.env.SECRET;
exports.SECRET = SECRET;
const SALTROUNDS = 10;
exports.SALTROUNDS = SALTROUNDS;
const MAXAGE = 3 * 24 * 60 * 60;
exports.MAXAGE = MAXAGE;
const basePath = "/api/v1";
exports.basePath = basePath;
const DATABASES = {
    USER: "user"
};
exports.DATABASES = DATABASES;
const MESSAGES = {
    DATABASE: {
        CONNECTED: "Connection to database has been established successfully",
        ERROR: "Unable to connect to database:"
    },
    USER: {
        CREATED: "User created successfully.",
        DUPLICATE_EMAIL: "Email already exist.",
        DUPLICATE_USERNAME: "Username already exist.",
        INVALID_EMAIL: "Email does not exist.",
        INVALID_PASSWORD: "Incorrect password.",
        LOGGEDIN: "Successfully logged in"
    }
};
exports.MESSAGES = MESSAGES;
