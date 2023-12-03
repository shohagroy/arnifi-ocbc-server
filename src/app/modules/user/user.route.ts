import express from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "./user.constants";

const router = express.Router();

router
  .route("/")
  .get(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    userController.getAll
  );

router
  .route("/:id")
  .patch(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    userController.updateOne
  )
  .delete(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    userController.deleteOne
  );

export const userRoutes = router;
