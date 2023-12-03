import { IDType, Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IIDTypeFilters } from "./IdType.interface";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { idTypeSearchableFields } from "./IdType.constants";

const insertIntoDB = async (data: IDType): Promise<IDType> => {
  const result = await prisma.iDType.create({
    data,
  });

  return result;
};

const findAll = async (
  paginationOptions: IPaginationOptions,
  filters: IIDTypeFilters
) => {
  const { size, page, skip } =
    paginationHelpers.calculatePagination(paginationOptions);
  const { search, ...filterData } = filters;

  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: idTypeSearchableFields.map((field) => ({
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

  const whereConditions: Prisma.IDTypeWhereInput | {} =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.iDType.findMany({
    where: whereConditions,
    include: {
      country: true,
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

  const total = await prisma.iDType.count({
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
  payload: Partial<IDType>
): Promise<IDType | null> => {
  const result = await prisma.iDType.update({
    where: { id },
    data: {
      tittle: payload.tittle,
      countryId: payload.countryId,
    },
  });

  return result;
};

const deleteById = async (id: string): Promise<IDType | null> => {
  const result = await prisma.iDType.delete({
    where: {
      id,
    },
  });

  return result;
};

const findOne = async (payload: IDType): Promise<IDType | null> => {
  const result = await prisma.iDType.findUnique({
    where: {
      tittle: payload.tittle,
      countryId: payload.countryId,
    },
  });

  return result;
};

const findAllType = async (countryId: string): Promise<IDType[]> => {
  const result = await prisma.iDType.findMany({
    where: {
      countryId,
    },
    orderBy: {
      tittle: "asc",
    },
  });

  return result;
};

export const idTypeService = {
  insertIntoDB,
  findAll,
  updateById,
  deleteById,
  findOne,
  findAllType,
};
