import express from "express";
import { authRoutes } from "../modules/auth/auth.route";
import { userRoutes } from "../modules/user/user.route";
import { countryRoutes } from "../modules/country/country.route";
import { idTypeRoutes } from "../modules/IdType/IdType.route";
import { stepFildRoutes } from "../modules/stepField/stepField.route";
import { formStepRoutes } from "../modules/formStep/formStep.route";
import { explorePdfRoute } from "../modules/explorePdf/explorePdf.route";
const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/countries",
    route: countryRoutes,
  },
  {
    path: "/idTypes",
    route: idTypeRoutes,
  },
  {
    path: "/form-step",
    route: formStepRoutes,
  },
  {
    path: "/step-filds",
    route: stepFildRoutes,
  },
  {
    path: "/create-pdf",
    route: explorePdfRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
