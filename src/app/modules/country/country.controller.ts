import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { countryService } from "./country.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const create = catchAsync(async (req: Request, res: Response) => {
  const result = await countryService.insertIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Country Created Successfully!",
    data: result,
  });
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  const result = await countryService.findALl();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: result?.length
      ? "Countries Retrieved Successfully!"
      : "No Country Found!",
    data: result,
  });
});

const updateOne = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
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
