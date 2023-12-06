import { FormStep, Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IFormStepFilters } from "./formStep.interface";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { formStepSearchableFields } from "./formStep.constants";

const insertIntoDB = async (data: FormStep): Promise<FormStep> => {
  // console.log(data);
  const result = await prisma.formStep.create({
    data,
  });

  return result;
};

const findAll = async (
  paginationOptions: IPaginationOptions,
  filters: IFormStepFilters
) => {
  const { size, page, skip } =
    paginationHelpers.calculatePagination(paginationOptions);
  const { search, ...filterData } = filters;

  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: formStepSearchableFields.map((field) => ({
        [field]: {
          contains: search,
          mode: "insensitive",
        },
      })),
    });
  }

  // if (Object.keys(filterData).length > 0) {
  //   andConditions.push({
  //     AND: Object.keys(filterData).map((key) => {
  //       if (key === "countryId") {
  //         return {
  //           [key]: {
  //             equals: filterData[key],
  //           },
  //         };
  //       }
  //     }),
  //   });
  // }

  const whereConditions: Prisma.FormStepWhereInput | {} =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.formStep.findMany({
    where: whereConditions,
    include: {
      stepFilds: true,
    },
    skip,
    take: size,
    orderBy:
      paginationOptions.sortBy && paginationOptions.sortOrder
        ? { [paginationOptions.sortBy]: paginationOptions.sortOrder }
        : {
            tittle: "asc",
          },
  });

  const total = await prisma.formStep.count({
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
};

const updateById = async (
  id: string,
  payload: Partial<FormStep>
): Promise<FormStep | null> => {
  const result = await prisma.formStep.update({
    where: { id },
    data: {
      tittle: payload.tittle,
      // countryId: payload.countryId,
    },
  });

  return result;
};

const deleteById = async (id: string): Promise<FormStep | null> => {
  const result = await prisma.formStep.delete({
    where: {
      id,
    },
  });

  return result;
};

const findOne = async (payload: FormStep): Promise<FormStep | null> => {
  const result = await prisma.formStep.findFirst({
    where: {
      tittle: payload.tittle,
      // countryId: payload.countryId,
      value: payload.value,
    },
  });

  return result;
};

const findCountryFromSteps = async (
  countryId: string,
  value: string
): Promise<FormStep[]> => {
  const result = await prisma.formStep.findMany({
    where: {
      // countryId,
      value,
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
};

export const formStepService = {
  insertIntoDB,
  findAll,
  updateById,
  deleteById,
  findOne,
  findCountryFromSteps,
};
