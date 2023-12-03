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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
// import { hashedPassword } from "../../utils/hashedPassword";
// import { jwtHelpers } from "../../utils/jwtHelpers";
const user_service_1 = require("../user/user.service");
const hashedPassword_1 = require("../../../utils/hashedPassword");
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    payload.password = yield hashedPassword_1.hashedPassword.createhas(payload.password);
    const result = yield user_service_1.userService.insertIntoDB(payload);
    result.password = "";
    return result;
});
// const userSignin = async (payload: Partial<User>) => {
//   const { email, password } = payload;
//   const isUserExists = await userService.findByEmail(email!);
//   if (!isUserExists) {
//     throw new ApiError(httpStatus.NOT_FOUND, "User does not exists!");
//   }
//   const isPasswordMatched = await hashedPassword.comparePassword(
//     password!,
//     isUserExists.password
//   );
//   if (!isPasswordMatched) {
//     throw new ApiError(httpStatus.FORBIDDEN, "Password does not match!");
//   }
//   const refreshToken = await jwtHelpers.createToken(
//     isUserExists,
//     envconfig.refreshToken_expires!
//   );
//   const accessToken = await jwtHelpers.createToken(
//     isUserExists,
//     envconfig.expires_in!
//   );
//   return { refreshToken, accessToken };
// };
// const changePassword = async (email: string, payload: IChangePassword) => {
//   const { newPassword, oldPassword } = payload;
//   const isUserExists = await userService.findByEmail(email!);
//   if (!isUserExists) {
//     throw new ApiError(httpStatus.NOT_FOUND, "User does not exists!");
//   }
//   const isPasswordMatched = await hashedPassword.comparePassword(
//     oldPassword!,
//     isUserExists.password
//   );
//   if (!isPasswordMatched) {
//     throw new ApiError(httpStatus.FORBIDDEN, "Password does not match!");
//   }
//   const password = await hashedPassword.createhas(newPassword);
//   const result = await userService.updateUserDataToDb(isUserExists.id, {
//     password,
//   });
//   return result;
// };
// const getProfile = async (id: string) => {
//   const result = await userService.getSingleUserToDb(id);
//   return result;
// };
const createAccessToken = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.findOne(email);
    console.log(result);
    // const accessToken = await jwtHelpers.createToken(
    //   result,
    //   envconfig.expires_in!
    // );
    return result;
});
// const changeUserRole = async (id: string, role: Partial<User>) => {
//   const result = await userService.updateUserDataToDb(id, role);
//   return result;
// };
// const deleteUser = async (id: string) => {
//   const result = await userService.deleteUserToDb(id);
//   return result;
// };
exports.authService = {
    create,
    createAccessToken,
};
