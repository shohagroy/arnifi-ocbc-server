import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import { idTypeFilterableFields } from "./IdType.constants";
import pick from "../../../shared/pick";
import ApiError from "../../../errors/ApiError";
import { IDType } from "@prisma/client";
import { idTypeService } from "./IdType.service";

const create = catchAsync(async (req: Request, res: Response) => {
  const isExists = await idTypeService.findOne(req.body);

  if (isExists) {
    throw new ApiError(
      httpStatus.CONFLICT,
      `${req.body?.name} ID Type is already exists!`
    );
  }

  const result = await idTypeService.insertIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "ID Type Created Successfully!",
    data: result,
  });
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const filters = pick(req.query, idTypeFilterableFields);

  const result = await idTypeService.findAll(paginationOptions, filters);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "ID Types Get Successfully",
    data: result?.data,
    meta: result?.meta,
  });
});

const updateOne = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const isExists = await idTypeService.findOne(req.body);

  if (isExists) {
    throw new ApiError(
      httpStatus.CONFLICT,
      `${req.body.name} ID Type is already exists!`
    );
  }

  const result = await idTypeService.updateById(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "ID Type Update Successfully!",
    data: result,
  });
});

const deleteOne = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await idTypeService.deleteById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "ID Types Delete Successfully!",
    data: result,
  });
});

export const idTypeController = {
  create,
  getAll,
  updateOne,
  deleteOne,
};
