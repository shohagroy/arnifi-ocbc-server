import express from "express";
import { userController } from "./user.controller";

const router = express.Router();

router.route("/").get(userController.getAll);

router
  .route("/:id")
  .patch(userController.updateOne)
  .delete(userController.deleteOne);

export const userRoutes = router;
