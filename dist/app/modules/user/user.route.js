"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constants_1 = require("./user.constants");
const router = express_1.default.Router();
router
    .route("/")
    .get((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.ADMIN, user_constants_1.ENUM_USER_ROLE.SUPER_ADMIN), user_controller_1.userController.getAll);
router
    .route("/:id")
    .patch((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.ADMIN, user_constants_1.ENUM_USER_ROLE.SUPER_ADMIN), user_controller_1.userController.updateOne)
    .delete((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.ADMIN, user_constants_1.ENUM_USER_ROLE.SUPER_ADMIN), user_controller_1.userController.deleteOne);
exports.userRoutes = router;
