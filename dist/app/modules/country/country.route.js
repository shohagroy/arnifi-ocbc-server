"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.countryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const country_controller_1 = require("./country.controller");
const router = express_1.default.Router();
router.route("/").get(country_controller_1.countryController.getAll).post(country_controller_1.countryController.create);
router
    .route("/:id")
    .patch(country_controller_1.countryController.updateOne)
    .delete(country_controller_1.countryController.deleteOne);
exports.countryRoutes = router;
