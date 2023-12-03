"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const auth_service_1 = require("./auth.service");
const envconfig_1 = __importDefault(require("../../../config/envconfig"));
const jwtHelpers_1 = require("../../../utils/jwtHelpers");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_service_1 = require("../user/user.service");
const hashedPassword_1 = require("../../../utils/hashedPassword");
const create = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { password, repassword, email } = _a, other = __rest(_a, ["password", "repassword", "email"]);
    if (password !== repassword) {
        throw new ApiError_1.default(http_status_1.default.NOT_ACCEPTABLE, "Password and Repassword did not match!");
    }
    const isExists = yield user_service_1.userService.findOne(email);
    if (isExists) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, `${email} email is already exists!`);
    }
    const result = yield auth_service_1.authService.create(Object.assign(Object.assign({}, other), { email, password }));
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User Created Successufully!",
        data: result,
    });
}));
const login = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const isExists = yield user_service_1.userService.findOne(email);
    if (!isExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, `User does not exists!`);
    }
    const isPasswordMatched = yield hashedPassword_1.hashedPassword.comparePassword(password, isExists.password);
    if (!isPasswordMatched) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Password does not match!");
    }
    const accessToken = yield jwtHelpers_1.jwtHelpers.createToken(isExists, envconfig_1.default.expires_in);
    const refreshToken = yield jwtHelpers_1.jwtHelpers.createToken(isExists, envconfig_1.default.refreshToken_expires);
    const cookieOptions = {
        secure: envconfig_1.default.node_env === "production",
        httpOnly: true,
    };
    res.cookie("refreshToken", refreshToken, cookieOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User Log In Successufully!",
        data: { accessToken },
    });
}));
const getAccessToken = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.refreshToken;
    const validate = jwtHelpers_1.jwtHelpers.verifyToken(token, envconfig_1.default.secrect_token_key);
    const user = yield user_service_1.userService.findOne(validate === null || validate === void 0 ? void 0 : validate.email);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized");
    }
    const accessToken = yield jwtHelpers_1.jwtHelpers.createToken(user, envconfig_1.default.expires_in);
    req.headers.Authorization = accessToken;
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Access Token Get successufully",
        data: { accessToken },
    });
}));
// const changeUserRole = catchAsync(async (req: Request, res: Response) => {
//   const { id, ...other } = req.body;
//   const result = await authService.changeUserRole(id, other);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "User Role Update successufully",
//     data: result,
//   });
// });
// const deleteUser = catchAsync(async (req: Request, res: Response) => {
//   const { email } = req.body;
//   const result = await authService.deleteUser(email);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "user Delete Successfully successufully",
//     data: result,
//   });
// });
exports.authController = {
    create,
    login,
    getAccessToken,
};
