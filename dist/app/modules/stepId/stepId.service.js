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
exports.stepFildService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.stepFild.create({
        data,
    });
    return result;
});
// const findAll = async (
//   paginationOptions: IPaginationOptions,
//   filters: IIDTypeFilters
// ) => {
//   const { size, page, skip } =
//     paginationHelpers.calculatePagination(paginationOptions);
//   const { search, ...filterData } = filters;
//   const andConditions = [];
//   if (search) {
//     andConditions.push({
//       OR: idTypeSearchableFields.map((field) => ({
//         [field]: {
//           contains: search,
//           mode: "insensitive",
//         },
//       })),
//     });
//   }
//   if (Object.keys(filterData).length > 0) {
//     andConditions.push({
//       AND: Object.keys(filterData).map((key) => {
//         if (key === "countryId") {
//           return {
//             [key]: {
//               equals: filterData[key],
//             },
//           };
//         }
//       }),
//     });
//   }
//   const whereConditions: Prisma.IDTypeWhereInput | {} =
//     andConditions.length > 0 ? { AND: andConditions } : {};
//   const result = await prisma.iDType.findMany({
//     where: whereConditions,
//     include: {
//       country: true,
//     },
//     skip,
//     take: size,
//     orderBy:
//       paginationOptions.sortBy && paginationOptions.sortOrder
//         ? { [paginationOptions.sortBy]: paginationOptions.sortOrder }
//         : {
//             tittle: "asc",
//           },
//   });
//   const total = await prisma.iDType.count({
//     where: whereConditions,
//   });
//   return {
//     meta: {
//       total,
//       page,
//       size,
//     },
//     data: result,
//   };
// };
const updateById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.stepFild.update({
        where: { id },
        data: {
            name: payload.name,
            label: payload.label,
            placeholder: payload.placeholder,
            errorText: payload.errorText,
            type: payload.type,
            stepId: payload.stepId,
            countryId: payload.countryId,
        },
    });
    return result;
});
const deleteById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.stepFild.delete({
        where: {
            id,
        },
    });
    return result;
});
const findOne = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.stepFild.findFirst({
        where: {
            name: payload.name,
            type: payload.type,
            countryId: payload.countryId,
            stepId: payload.stepId,
        },
    });
    return result;
});
const findStepFilds = (countryId, stepId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.stepFild.findMany({
        where: {
            countryId,
            stepId,
        },
        orderBy: {
            createdAt: "asc",
        },
    });
    return result;
});
exports.stepFildService = {
    insertIntoDB,
    updateById,
    deleteById,
    findStepFilds,
    findOne,
};
