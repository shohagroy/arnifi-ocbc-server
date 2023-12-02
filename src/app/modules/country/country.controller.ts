import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { countryService } from "./country.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import { countryFilterableFields } from "./country.constants";
import pick from "../../../shared/pick";
import ApiError from "../../../errors/ApiError";

const create = catchAsync(async (req: Request, res: Response) => {
  const isExists = await countryService.findOne(req.body);

  if (isExists) {
    throw new ApiError(
      httpStatus.CONFLICT,
      `${req.body?.name} country name is already exists!`
    );
  }

  const result = await countryService.insertIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Country Created Successfully!",
    data: result,
  });
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const filters = pick(req.query, countryFilterableFields);
  const result = await countryService.findALl(paginationOptions, filters);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Countries Retrieved Successfully",
    data: result?.data,
    meta: result?.meta,
  });
});

const updateOne = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const isExists = await countryService.findOne(req.body);

  if (isExists) {
    throw new ApiError(
      httpStatus.CONFLICT,
      `${req.body.name} country name is already exists!`
    );
  }

  const result = await countryService.updateById(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Country Update Successfully!",
    data: result,
  });
});

const deleteOne = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await countryService.deleteById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Country Delete Successfully!",
    data: result,
  });
});

export const countryController = {
  create,
  getAll,
  updateOne,
  deleteOne,
};
