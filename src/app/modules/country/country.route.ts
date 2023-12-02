import express from "express";
import { countryController } from "./country.controller";

const router = express.Router();

router.route("/").get(countryController.getAll).post(countryController.create);

router
  .route("/:id")
  .patch(countryController.updateOne)
  .delete(countryController.deleteOne);

export const countryRoutes = router;
