import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import pick from "../../../shared/pick";
import ApiError from "../../../errors/ApiError";
import { IDType, StepFild } from "@prisma/client";
import { stepFildService } from "./stepId.service";

const create = catchAsync(async (req: Request, res: Response) => {
  const isExists = await stepFildService.findOne(req.body);

  if (isExists) {
    throw new ApiError(
      httpStatus.CONFLICT,
      `${req.body?.name} Step Fild is already exists!`
    );
  }

  const result = await stepFildService.insertIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Stpe Fild Created Successfully!",
    data: result,
  });
});

// const getAll = catchAsync(async (req: Request, res: Response) => {
//   const paginationOptions = pick(req.query, paginationFields);
//   const filters = pick(req.query, idTypeFilterableFields);

//   const result = await stepFildService.findAll(paginationOptions, filters);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "ID Types Get Successfully",
//     data: result?.data,
//     meta: result?.meta,
//   });
// });

const updateOne = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const isExists = await stepFildService.findOne(req.body);

  if (isExists) {
    throw new ApiError(
      httpStatus.CONFLICT,
      `${req.body.name} ID Type is already exists!`
    );
  }

  const result = await stepFildService.updateById(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Step Fild Update Successfully!",
    data: result,
  });
});

const deleteOne = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await stepFildService.deleteById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Step Fild Delete Successfully!",
    data: result,
  });
});

const getAllStepTypes = catchAsync(async (req: Request, res: Response) => {
  const { countryId, stepId } = req.params;

  const result = await stepFildService.findStepFilds(countryId, stepId);

  sendResponse<StepFild[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Step Filds Get Successfully!",
    data: result,
  });
});

export const stepFildController = {
  create,
  updateOne,
  deleteOne,
  getAllStepTypes,
};
