import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { authService } from "./auth.service";
import envconfig from "../../../config/envconfig";
import { Secret } from "jsonwebtoken";
import { jwtHelpers } from "../../../utils/jwtHelpers";
import ApiError from "../../../errors/ApiError";
import { userService } from "../user/user.service";
import { hashedPassword } from "../../../utils/hashedPassword";

const create = catchAsync(async (req: Request, res: Response) => {
  const { password, repassword, email, ...other } = req.body;

  if (password !== repassword) {
    throw new ApiError(
      httpStatus.NOT_ACCEPTABLE,
      "Password and Repassword did not match!"
    );
  }

  const isExists = await userService.findOne(email);

  if (isExists) {
    throw new ApiError(
      httpStatus.CONFLICT,
      `${email} email is already exists!`
    );
  }
  const result = await authService.create({ ...other, email, password });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Created Successufully!",
    data: result,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const isExists = await userService.findOne(email);

  if (!isExists) {
    throw new ApiError(httpStatus.NOT_FOUND, `User does not exists!`);
  }

  const isPasswordMatched = await hashedPassword.comparePassword(
    password!,
    isExists.password
  );

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password does not match!");
  }

  const accessToken = await jwtHelpers.createToken(
    isExists,
    envconfig.expires_in!
  );

  const refreshToken = await jwtHelpers.createToken(
    isExists,
    envconfig.refreshToken_expires!
  );

  const cookieOptions = {
    secure: envconfig.node_env === "production",
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Log In Successufully!",
    data: { accessToken },
  });
});

const getAccessToken = catchAsync(async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;

  const validate = jwtHelpers.verifyToken(
    token,
    envconfig.secrect_token_key as Secret
  );

  const user = await userService.findOne(validate?.email!);

  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
  }

  const accessToken = await jwtHelpers.createToken(user, envconfig.expires_in!);
  req.headers.Authorization = accessToken;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Access Token Get successufully",
    data: { accessToken },
  });
});

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

export const authController = {
  create,
  login,
  getAccessToken,
};
