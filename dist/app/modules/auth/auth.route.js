"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const router = express_1.default.Router();
router.route("/create-user").post(auth_controller_1.authController.userSignup);
router.route("/login").post(auth_controller_1.authController.userSignin);
router.route("/change-password").patch(
// auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
auth_controller_1.authController.changePassword);
router.route("/change-user-role").patch(
// auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
auth_controller_1.authController.changeUserRole);
router.route("/delete-user").patch(
// auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
auth_controller_1.authController.deleteUser);
router.route("/refresh-token").post(
// auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
auth_controller_1.authController.getAccessToken);
exports.authRoutes = router;
