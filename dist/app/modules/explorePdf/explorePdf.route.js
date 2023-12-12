"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.explorePdfRoute = void 0;
const express_1 = __importDefault(require("express"));
const explorePdf_controller_1 = require("./explorePdf.controller");
const router = express_1.default.Router();
router
    .route("/")
    .post(explorePdf_controller_1.explorePdfController.createPdf)
    .get(explorePdf_controller_1.explorePdfController.createPdfServer);
exports.explorePdfRoute = router;
