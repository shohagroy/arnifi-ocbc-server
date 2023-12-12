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
exports.formStepController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const pagination_1 = require("../../../constants/pagination");
const pick_1 = __importDefault(require("../../../shared/pick"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const formStep_service_1 = require("./formStep.service");
const formStep_constants_1 = require("./formStep.constants");
const create = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const isExists = yield formStep_service_1.formStepService.findOne(req.body);
    if (isExists) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, `${(_a = req.body) === null || _a === void 0 ? void 0 : _a.name} Form Step is already exists!`);
    }
    const result = yield formStep_service_1.formStepService.insertIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "From Step Created Successfully!",
        data: result,
    });
}));
const getAll = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const filters = (0, pick_1.default)(req.query, formStep_constants_1.formStepFilterableFields);
    const result = yield formStep_service_1.formStepService.findAll(paginationOptions, filters);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Form Step Get Successfully",
        data: result === null || result === void 0 ? void 0 : result.data,
        meta: result === null || result === void 0 ? void 0 : result.meta,
    });
}));
const updateOne = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const isExists = yield formStep_service_1.formStepService.findOne(req.body);
    if (isExists) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, `${req.body.name} Form Step is already exists!`);
    }
    const result = yield formStep_service_1.formStepService.updateById(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Form Step Update Successfully!",
        data: result,
    });
}));
const deleteOne = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield formStep_service_1.formStepService.deleteById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Form Step Delete Successfully!",
        data: result,
    });
}));
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
const getWillStep = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { value, countryId } = req.params;
    const result = yield formStep_service_1.formStepService.findWillStep(value, countryId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Form Steps Get Successfully!",
        data: result,
    });
}));
exports.formStepController = {
    create,
    getAll,
    updateOne,
    deleteOne,
    getWillStep,
};
