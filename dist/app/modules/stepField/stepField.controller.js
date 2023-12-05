"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stepFildController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const stepField_service_1 = require("./stepField.service");
const create = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const isExists = yield stepField_service_1.stepFildService.findOne(req.body);
    if (isExists) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, `${(_a = req.body) === null || _a === void 0 ? void 0 : _a.label} Step Fild is already exists!`);
    }
    const result = yield stepField_service_1.stepFildService.insertIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Stpe Fild Created Successfully!",
        data: result,
    });
}));
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
const updateOne = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // const isExists = await stepFildService.findOne(req.body);
    // console.log(isExists);
    // if (isExists) {
    //   throw new ApiError(
    //     httpStatus.CONFLICT,
    //     `${req.body.label} Step Fild is already exists!`
    //   );
    // }
    const result = yield stepField_service_1.stepFildService.updateById(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Step Fild Update Successfully!",
        data: result,
    });
}));
const deleteOne = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield stepField_service_1.stepFildService.deleteById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Step Fild Delete Successfully!",
        data: result,
    });
}));
const getAllStepTypes = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { countryId, stepId } = req.params;
    const result = yield stepField_service_1.stepFildService.findStepFilds(countryId, stepId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Step Filds Get Successfully!",
        data: result,
    });
}));
exports.stepFildController = {
    create,
    updateOne,
    deleteOne,
    getAllStepTypes,
};
