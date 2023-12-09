import express from "express";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../user/user.constants";
import { idTypeController } from "./IdType.controller";

const router = express.Router();

router
  .route("/")
  .get(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    idTypeController.getAll
  )
  .post(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    idTypeController.create
  );

router
  .route("/:id")
  .patch(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    idTypeController.updateOne
  )
  .delete(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    idTypeController.deleteOne
  );

export const idTypeRoutes = router;
