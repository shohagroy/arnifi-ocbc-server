import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
// import { hashedPassword } from "../../utils/hashedPassword";
// import { jwtHelpers } from "../../utils/jwtHelpers";
import { userService } from "../user/user.service";
import { Role, User } from "@prisma/client";
import { hashedPassword } from "../../../utils/hashedPassword";
import { jwtHelpers } from "../../../utils/jwtHelpers";
import envconfig from "../../../config/envconfig";
import { ENUM_USER_ROLE } from "../user/user.constants";
import { IChangePassword } from "./auth.constans";

const create = async (payload: User) => {
  payload.password = await hashedPassword.createhas(payload.password!);

  const result = await userService.insertIntoDB(payload);
  result.password = "";
  return result;
};

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

const createAccessToken = async (email: string) => {
  const result = await userService.findOne(email);

  console.log(result);

  // const accessToken = await jwtHelpers.createToken(
  //   result,
  //   envconfig.expires_in!
  // );

  return result;
};

// const changeUserRole = async (id: string, role: Partial<User>) => {
//   const result = await userService.updateUserDataToDb(id, role);
//   return result;
// };

// const deleteUser = async (id: string) => {
//   const result = await userService.deleteUserToDb(id);
//   return result;
// };

export const authService = {
  create,
  createAccessToken,
};
