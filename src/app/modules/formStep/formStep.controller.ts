import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import pick from "../../../shared/pick";
import ApiError from "../../../errors/ApiError";
import { FormStep } from "@prisma/client";
import { formStepService } from "./formStep.service";
import { formStepFilterableFields } from "./formStep.constants";

const create = catchAsync(async (req: Request, res: Response) => {
  const isExists = await formStepService.findOne(req.body);

  if (isExists) {
    throw new ApiError(
      httpStatus.CONFLICT,
      `${req.body?.name} Form Step is already exists!`
    );
  }

  const result = await formStepService.insertIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "From Step Created Successfully!",
    data: result,
  });
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const filters = pick(req.query, formStepFilterableFields);

  const result = await formStepService.findAll(paginationOptions, filters);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Form Step Get Successfully",
    data: result?.data,
    meta: result?.meta,
  });
});

const updateOne = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const isExists = await formStepService.findOne(req.body);

  if (isExists) {
    throw new ApiError(
      httpStatus.CONFLICT,
      `${req.body.name} Form Step is already exists!`
    );
  }

  const result = await formStepService.updateById(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Form Step Update Successfully!",
    data: result,
  });
});

const deleteOne = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await formStepService.deleteById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Form Step Delete Successfully!",
    data: result,
  });
});

// const getCountryFormStep = catchAsync(async (req: Request, res: Response) => {
//   const { id, countryId } = req.params;
//   const result = await formStepService.findCountryFromSteps(countryId);

//   sendResponse<FormStep[]>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Country Form Steps Get Successfully!",
//     data: result,
//   });
// });

const getWillStep = catchAsync(async (req: Request, res: Response) => {
  const { value, countryId } = req.params;
  const result = await formStepService.findWillStep(value, countryId);

  sendResponse<FormStep>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Form Steps Get Successfully!",
    data: result,
  });
});

export const formStepController = {
  create,
  getAll,
  updateOne,
  deleteOne,
  getWillStep,
};
