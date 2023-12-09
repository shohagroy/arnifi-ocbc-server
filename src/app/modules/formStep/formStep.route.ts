import express from "express";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../user/user.constants";
import { formStepController } from "./formStep.controller";

const router = express.Router();

router
  .route("/")
  .get(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    formStepController.getAll
  )
  .post(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    formStepController.create
  );

router
  .route("/:id")
  .patch(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    formStepController.updateOne
  )
  .delete(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    formStepController.deleteOne
  )
  .get(formStepController.getWillStep);

router.route("/:value/:countryId").get(formStepController.getWillStep);

export const formStepRoutes = router;
