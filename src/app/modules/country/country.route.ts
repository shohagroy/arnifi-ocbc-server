import express from "express";
import { countryController } from "./country.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../user/user.constants";

const router = express.Router();

router
  .route("/")
  .get(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    countryController.getAll
  )
  .post(countryController.create);

router
  .route("/:id")
  .patch(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    countryController.updateOne
  )
  .delete(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    countryController.deleteOne
  );

export const countryRoutes = router;
