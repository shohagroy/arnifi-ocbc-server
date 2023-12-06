"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.countryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const country_controller_1 = require("./country.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constants_1 = require("../user/user.constants");
const router = express_1.default.Router();
router.route("/get-all").get(country_controller_1.countryController.getAllCountries);
router
    .route("/wills")
    .get((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.ADMIN, user_constants_1.ENUM_USER_ROLE.SUPER_ADMIN), country_controller_1.countryController.getAllCountriesWills);
router.route("/wills/active").get(country_controller_1.countryController.getActiveCountryWill);
router
    .route("/wills-status/:id")
    .patch((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.ADMIN, user_constants_1.ENUM_USER_ROLE.SUPER_ADMIN), country_controller_1.countryController.changeWillStatus);
router
    .route("/")
    .get((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.ADMIN, user_constants_1.ENUM_USER_ROLE.SUPER_ADMIN), country_controller_1.countryController.getAll)
    .post((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.ADMIN, user_constants_1.ENUM_USER_ROLE.SUPER_ADMIN), country_controller_1.countryController.create);
router
    .route("/:id")
    .patch((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.ADMIN, user_constants_1.ENUM_USER_ROLE.SUPER_ADMIN), country_controller_1.countryController.updateOne)
    .delete((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.ADMIN, user_constants_1.ENUM_USER_ROLE.SUPER_ADMIN), country_controller_1.countryController.deleteOne);
exports.countryRoutes = router;
