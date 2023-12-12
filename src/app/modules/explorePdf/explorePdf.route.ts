import express from "express";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../user/user.constants";
import { explorePdfController } from "./explorePdf.controller";

const router = express.Router();

router.route("/").post(explorePdfController.createPdf);

export const explorePdfRoute = router;
