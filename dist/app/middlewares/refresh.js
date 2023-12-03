"use strict";
// import { NextFunction, Request, Response } from "express";
// import httpStatus from "http-status";
// import { Secret } from "jsonwebtoken";
// import ApiError from "../../errors/ApiError";
// import envconfig from "../../config/envconfig";
// import { jwtHelpers } from "../../utils/jwtHelpers";
// const refreshToken =
//   () => async (req: Request, res: Response, next: NextFunction) => {
//     const token = req.cookies.refreshToken;
//     const validate = jwtHelpers.verifyToken(
//       token,
//       envconfig.secrect_token_key as Secret
//     );
//     if(!token) {
//       throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized")
//     }
//     const { iat, exp, ...other } = validate;
//     const accessToken = await jwtHelpers.createToken(
//       other,
//       envconfig.expires_in!
//     );
//   };
// export default refreshToken;
