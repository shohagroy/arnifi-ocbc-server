import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { StepFild } from "@prisma/client";
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

  // const isExists = await stepFildService.findOne(req.body);

  // console.log(isExists);

  // if (isExists) {
  //   throw new ApiError(
  //     httpStatus.CONFLICT,
  //     `${req.body.label} Step Fild is already exists!`
  //   );
  // }

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

const getAllStepTypes = catchAsync(async (req: Request, res: Response) => {
  const { countryId, stepId } = req.params;

  const result = await stepFildService.findStepFilds(countryId, stepId);

  sendResponse<StepFild[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Step Fields Get Successfully!",
    data: result,
  });
});

export const stepFildController = {
  create,
  updateOne,
  deleteOne,
  getAllStepTypes,
};
