import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import httpStatus from "http-status";
import mainRoute from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import envconfig from "./config/envconfig";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    // origin: "https://arnifi-ocbc-client.vercel.app",
    origin: ["http://localhost:3000", `${envconfig.client_url}`],

    // envconfig.node_env !== "development"
    //   ? "http://localhost:3000"
    //   : envconfig.client_url,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })
);

// app.use(
//   cors({
//     origin: "https://arnifi-ocbc-client.vercel.app",
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true,
//   })
// );
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

app.use("/api/v1", mainRoute);
app.use(globalErrorHandler);

app.get("/", (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({
    success: true,
    message: "Arnifi Online Will Generator server is running...",
  });
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
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

export default app;
