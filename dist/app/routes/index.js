"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const user_route_1 = require("../modules/user/user.route");
const country_route_1 = require("../modules/country/country.route");
const IdType_route_1 = require("../modules/IdType/IdType.route");
const stepField_route_1 = require("../modules/stepField/stepField.route");
const formStep_route_1 = require("../modules/formStep/formStep.route");
const explorePdf_route_1 = require("../modules/explorePdf/explorePdf.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/auth",
        route: auth_route_1.authRoutes,
    },
    {
        path: "/users",
        route: user_route_1.userRoutes,
    },
    {
        path: "/countries",
        route: country_route_1.countryRoutes,
    },
    {
        path: "/idTypes",
        route: IdType_route_1.idTypeRoutes,
    },
    {
        path: "/form-step",
        route: formStep_route_1.formStepRoutes,
    },
    {
        path: "/step-filds",
        route: stepField_route_1.stepFildRoutes,
    },
    {
        path: "/create-pdf",
        route: explorePdf_route_1.explorePdfRoute,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
