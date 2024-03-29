"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtHelpers = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envconfig_1 = __importDefault(require("../config/envconfig"));
const createToken = (user, expiresIn) => {
    const { id, fullName, email, role } = user;
    const payload = { id, fullName, email, role };
    return jsonwebtoken_1.default.sign(payload, envconfig_1.default.secrect_token_key, {
        expiresIn,
    });
};
const verifyToken = (token, secret) => {
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.jwtHelpers = {
    createToken,
    verifyToken,
};
