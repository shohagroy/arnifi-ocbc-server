"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_status_1 = __importDefault(require("http-status"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const envconfig_1 = __importDefault(require("./config/envconfig"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    // origin: "https://arnifi-ocbc-client.vercel.app",
    origin: ["http://localhost:3000", `${envconfig_1.default.client_url}`],
    // envconfig.node_env !== "development"
    //   ? "http://localhost:3000"
    //   : envconfig.client_url,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
}));
// app.use(
//   cors({
//     origin: "https://arnifi-ocbc-client.vercel.app",
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true,
//   })
// );
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "50mb" }));
app.use((0, cookie_parser_1.default)());
app.use("/api/v1", routes_1.default);
app.use(globalErrorHandler_1.default);
app.get("/", (req, res) => {
    res.status(http_status_1.default.OK).json({
        success: true,
        message: "Arnifi Online Will Generator server is running...",
    });
});
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: "Not Found",
        errorMessages: [
            {
                path: req.originalUrl,
                message: "API Not Found",
            },
        ],
    });
    next();
});
exports.default = app;
