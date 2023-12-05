"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stepFildRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constants_1 = require("../user/user.constants");
const stepField_controller_1 = require("./stepField.controller");
const router = express_1.default.Router();
router
    .route("/get-all/:countryId/:stepId")
    .get(stepField_controller_1.stepFildController.getAllStepTypes);
router
    .route("/")
    // .get(
    //   auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    //   stepFildController.getAll
    // )
    .post((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.ADMIN, user_constants_1.ENUM_USER_ROLE.SUPER_ADMIN), stepField_controller_1.stepFildController.create);
router
    .route("/:id")
    .patch((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.ADMIN, user_constants_1.ENUM_USER_ROLE.SUPER_ADMIN), stepField_controller_1.stepFildController.updateOne)
    .delete((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.ADMIN, user_constants_1.ENUM_USER_ROLE.SUPER_ADMIN), stepField_controller_1.stepFildController.deleteOne);
exports.stepFildRoutes = router;
