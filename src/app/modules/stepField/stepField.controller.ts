import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { stepFildService } from "./stepField.service";

const create = catchAsync(async (req: Request, res: Response) => {
  const isExists = await stepFildService.findOne(req.body);

  if (isExists) {
    throw new ApiError(
      httpStatus.CONFLICT,
      `${req.body?.label} Step Fields is already exists!`
    );
  }

  const result = await stepFildService.insertIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Stpe Fields Created Successfully!",
    data: result,
  });
});

const updateOne = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await stepFildService.updateById(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Step Fields Update Successfully!",
    data: result,
  });
});

const deleteOne = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await stepFildService.deleteById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Step Fields Delete Successfully!",
    data: result,
  });
});

export const stepFildController = {
  create,
  updateOne,
  deleteOne,
};
