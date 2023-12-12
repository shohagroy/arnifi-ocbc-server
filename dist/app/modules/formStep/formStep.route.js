"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formStepRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constants_1 = require("../user/user.constants");
const formStep_controller_1 = require("./formStep.controller");
const router = express_1.default.Router();
router
    .route("/")
    .get((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.ADMIN, user_constants_1.ENUM_USER_ROLE.SUPER_ADMIN), formStep_controller_1.formStepController.getAll)
    .post((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.ADMIN, user_constants_1.ENUM_USER_ROLE.SUPER_ADMIN), formStep_controller_1.formStepController.create);
router
    .route("/:id")
    .patch((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.ADMIN, user_constants_1.ENUM_USER_ROLE.SUPER_ADMIN), formStep_controller_1.formStepController.updateOne)
    .delete((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.ADMIN, user_constants_1.ENUM_USER_ROLE.SUPER_ADMIN), formStep_controller_1.formStepController.deleteOne)
    .get(formStep_controller_1.formStepController.getWillStep);
router.route("/:value/:countryId").get(formStep_controller_1.formStepController.getWillStep);
exports.formStepRoutes = router;
