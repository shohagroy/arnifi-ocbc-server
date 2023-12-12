import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { explorePdfService } from "./explorePdf.service";

const createPdf = catchAsync(async (req: Request, res: Response) => {
  const result = await explorePdfService.createPdf();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "PDF Generate Successfully!",
    data: result,
  });
});

export const explorePdfController = {
  createPdf,
};
