import express from "express";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../user/user.constants";
import { stepFildController } from "./stepField.controller";

const router = express.Router();

router
  .route("/")
  .post(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    stepFildController.create
  );

router
  .route("/:id")
  .patch(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    stepFildController.updateOne
  )
  .delete(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    stepFildController.deleteOne
  );

export const stepFildRoutes = router;
