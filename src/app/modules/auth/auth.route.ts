import express from "express";
import { authController } from "./auth.controller";
import { ENUM_USER_ROLE } from "../user/user.constants";
import auth from "../../middlewares/auth";

const router = express.Router();

router.route("/refresh-token").post(authController.getAccessToken);

router
  .route("/create-user")
  .post(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    authController.create
  );
router.route("/login").post(authController.login);

export const authRoutes = router;
