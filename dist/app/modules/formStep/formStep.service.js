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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formStepService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const formStep_constants_1 = require("./formStep.constants");
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.formStep.create({
        data,
    });
    return result;
});
const findAll = (paginationOptions, filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { size, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const { search } = filters, filterData = __rest(filters, ["search"]);
    const andConditions = [];
    if (search) {
        andConditions.push({
            OR: formStep_constants_1.formStepSearchableFields.map((field) => ({
                [field]: {
                    contains: search,
                    mode: "insensitive",
                },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map((key) => {
                if (key === "countryId") {
                    return {
                        [key]: {
                            equals: filterData[key],
                        },
                    };
                }
            }),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.formStep.findMany({
        where: whereConditions,
        include: {
            country: true,
        },
        skip,
        take: size,
        orderBy: paginationOptions.sortBy && paginationOptions.sortOrder
            ? { [paginationOptions.sortBy]: paginationOptions.sortOrder }
            : {
                tittle: "asc",
            },
    });
    const total = yield prisma_1.default.formStep.count({
        where: whereConditions,
    });
    return {
        meta: {
            total,
            page,
            size,
        },
        data: result,
    };
});
const updateById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.formStep.update({
        where: { id },
        data: {
            tittle: payload.tittle,
            countryId: payload.countryId,
        },
    });
    return result;
});
const deleteById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.formStep.delete({
        where: {
            id,
        },
    });
    return result;
});
const findOne = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.formStep.findFirst({
        where: {
            tittle: payload.tittle,
            countryId: payload.countryId,
        },
    });
    return result;
});
const findCountryFromSteps = (countryId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.formStep.findMany({
        where: {
            countryId,
        },
        include: {
            stepFilds: {
                orderBy: {
                    createdAt: "asc",
                },
            },
        },
        orderBy: {
            createdAt: "asc",
        },
    });
    return result;
});
exports.formStepService = {
    insertIntoDB,
    findAll,
    updateById,
    deleteById,
    findOne,
    findCountryFromSteps,
};
