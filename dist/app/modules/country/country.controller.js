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
exports.countryController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const country_service_1 = require("./country.service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const pagination_1 = require("../../../constants/pagination");
const country_constants_1 = require("./country.constants");
const pick_1 = __importDefault(require("../../../shared/pick"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const create = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const isExists = yield country_service_1.countryService.findOne(req.body);
    if (isExists) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, `${(_a = req.body) === null || _a === void 0 ? void 0 : _a.name} country name is already exists!`);
    }
    const result = yield country_service_1.countryService.insertIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Country Created Successfully!",
        data: result,
    });
}));
const getAll = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const filters = (0, pick_1.default)(req.query, country_constants_1.countryFilterableFields);
    const result = yield country_service_1.countryService.findAll(paginationOptions, filters);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Countries Retrieved Successfully",
        data: result === null || result === void 0 ? void 0 : result.data,
        meta: result === null || result === void 0 ? void 0 : result.meta,
    });
}));
const updateOne = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const isExists = yield country_service_1.countryService.findOne(req.body);
    if (isExists) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, `${req.body.name} country name is already exists!`);
    }
    const result = yield country_service_1.countryService.updateById(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Country Update Successfully!",
        data: result,
    });
}));
const changeWillStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield country_service_1.countryService.activeStatus(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Wills Status Update Successfully!",
        data: result,
    });
}));
const deleteOne = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield country_service_1.countryService.deleteById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Country Delete Successfully!",
        data: result,
    });
}));
const getAllCountries = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield country_service_1.countryService.findAllCountry();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Countries Get Successfully!",
        data: result,
    });
}));
const getAllCountriesWills = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield country_service_1.countryService.findCountriesWill();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Countries Will Get Successfully!",
        data: result,
    });
}));
const getActiveCountryWill = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield country_service_1.countryService.findActiveCountryWill();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Countrry Will Get Successfully!",
        data: result,
    });
}));
exports.countryController = {
    create,
    getAll,
    updateOne,
    deleteOne,
    getAllCountries,
    getAllCountriesWills,
    changeWillStatus,
    getActiveCountryWill,
};
