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
exports.countryService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const country_constants_1 = require("./country.constants");
const findAllCountry = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.country.findMany({
        include: {
            idTypes: true,
        },
        orderBy: {
            name: "asc",
        },
    });
    return result;
});
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.country.create({
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
            OR: country_constants_1.countrySearchableFields.map((field) => ({
                [field]: {
                    contains: search,
                    mode: "insensitive",
                },
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.country.findMany({
        where: whereConditions,
        include: {},
        skip,
        take: size,
        orderBy: paginationOptions.sortBy && paginationOptions.sortOrder
            ? { [paginationOptions.sortBy]: paginationOptions.sortOrder }
            : {
                name: "asc",
            },
    });
    const total = yield prisma_1.default.country.count({
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
    const result = yield prisma_1.default.country.update({
        where: { id },
        data: {
            name: payload.name,
            countryCode: payload.countryCode,
        },
    });
    return result;
});
const deleteById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.country.delete({
        where: {
            id,
        },
    });
    return result;
});
const findCountriesWill = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.country.findMany({
        where: {
            stepFilds: {
                some: {},
            },
        },
        include: {
            stepFilds: true,
        },
        orderBy: {
            name: "asc",
        },
    });
    return result;
});
const activeStatus = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        yield transactionClient.country.updateMany({
            where: {
                isActive: true,
            },
            data: {
                isActive: false,
            },
        });
        return yield transactionClient.country.update({
            where: {
                id,
            },
            data: {
                isActive: true,
            },
        });
    }));
    return result;
});
const findActiveCountryWill = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.country.findFirst({
        where: {
            isActive: true,
        },
        include: {
            stepFilds: true,
            idTypes: true,
        },
    });
    return result;
});
const findOne = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.country.findUnique({
        where: {
            name: data.name,
            countryCode: data.countryCode,
        },
    });
    return result;
});
exports.countryService = {
    findAllCountry,
    insertIntoDB,
    findOne,
    findAll,
    updateById,
    deleteById,
    findCountriesWill,
    activeStatus,
    findActiveCountryWill,
};
