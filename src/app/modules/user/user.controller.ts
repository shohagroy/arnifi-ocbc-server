import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import { userFilterableFields } from "./user.constants";
import pick from "../../../shared/pick";
import { userService } from "./user.service";

const getAll = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const filters = pick(req.query, userFilterableFields);

  const result = await userService.findAll(paginationOptions, filters);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users Retrieved Successfully",
    data: result?.data,
    meta: result?.meta,
  });
});

const updateOne = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await userService.updateById(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Update Successfully!",
    data: result,
  });
});

const deleteOne = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await userService.deleteById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Delete Successfully!",
    data: result,
  });
});

export const userController = {
  getAll,
  updateOne,
  deleteOne,
};
