import { IDType, Prisma, StepFild } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IIDTypeFilters } from "./stepField.interface";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { idTypeSearchableFields } from "./stepField.constants";

const insertIntoDB = async (data: StepFild): Promise<StepFild> => {
  const result = await prisma.stepFild.create({
    data: {
      name: data.name,
      label: data.label,
      placeholder: data.placeholder,
      errorText: data.errorText,
      type: data.type,
      stepValue: data.stepValue,
      countryId: data.countryId,
      isRequired: data.isRequired,
    },
  });

  return result;
};

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

const updateById = async (
  id: string,
  payload: Partial<StepFild>
): Promise<StepFild | null> => {
  const result = await prisma.stepFild.update({
    where: { id },
    data: {
      name: payload.name,
      label: payload.label,
      placeholder: payload.placeholder,
      errorText: payload.errorText,
      type: payload.type,
      stepValue: payload.stepValue,
      countryId: payload.countryId,
      isRequired: payload.isRequired,
    },
  });

  return result;
};

const deleteById = async (id: string): Promise<StepFild | null> => {
  const result = await prisma.stepFild.delete({
    where: {
      id,
    },
  });

  return result;
};

const findOne = async (payload: StepFild): Promise<StepFild | null> => {
  const result = await prisma.stepFild.findFirst({
    where: {
      name: payload.name,
      type: payload.type,
      countryId: payload.countryId,
      stepValue: payload.stepValue,
    },
  });

  return result;
};

const findStepFilds = async (
  countryId: string,
  stepId: string
): Promise<StepFild[]> => {
  const result = await prisma.stepFild.findMany({
    where: {
      countryId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return result;
};

export const stepFildService = {
  insertIntoDB,
  updateById,
  deleteById,
  findStepFilds,
  findOne,
};
