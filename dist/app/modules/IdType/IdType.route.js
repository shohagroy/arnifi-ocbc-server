"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.idTypeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constants_1 = require("../user/user.constants");
const IdType_controller_1 = require("./IdType.controller");
const router = express_1.default.Router();
router
    .route("/")
    .get((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.ADMIN, user_constants_1.ENUM_USER_ROLE.SUPER_ADMIN), IdType_controller_1.idTypeController.getAll)
    .post((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.ADMIN, user_constants_1.ENUM_USER_ROLE.SUPER_ADMIN), IdType_controller_1.idTypeController.create);
router
    .route("/:id")
    .patch((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.ADMIN, user_constants_1.ENUM_USER_ROLE.SUPER_ADMIN), IdType_controller_1.idTypeController.updateOne)
    .delete((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.ADMIN, user_constants_1.ENUM_USER_ROLE.SUPER_ADMIN), IdType_controller_1.idTypeController.deleteOne);
exports.idTypeRoutes = router;
