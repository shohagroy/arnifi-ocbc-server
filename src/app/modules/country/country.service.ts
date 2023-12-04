import { Country, Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { ICountryFilters } from "./country.interface";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { countrySearchableFields } from "./country.constants";

const insertIntoDB = async (data: Country): Promise<Country> => {
  const result = await prisma.country.create({
    data,
  });

  return result;
};

const findAll = async (
  paginationOptions: IPaginationOptions,
  filters: ICountryFilters
) => {
  const { size, page, skip } =
    paginationHelpers.calculatePagination(paginationOptions);
  const { search, ...filterData } = filters;

  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: countrySearchableFields.map((field) => ({
        [field]: {
          contains: search,
          mode: "insensitive",
        },
      })),
    });
  }

  const whereConditions: Prisma.CountryWhereInput | {} =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.country.findMany({
    where: whereConditions,
    include: {},
    skip,
    take: size,
    orderBy:
      paginationOptions.sortBy && paginationOptions.sortOrder
        ? { [paginationOptions.sortBy]: paginationOptions.sortOrder }
        : {
            name: "asc",
          },
  });

  const total = await prisma.country.count({
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
  payload: Partial<Country>
): Promise<Country | null> => {
  const result = await prisma.country.update({
    where: { id },
    data: {
      name: payload.name,
      postalCode: payload.postalCode,
      countryCode: payload.countryCode,
    },
  });

  return result;
};

const deleteById = async (id: string): Promise<Country | null> => {
  const result = await prisma.country.delete({
    where: {
      id,
    },
  });

  return result;
};

const findOne = async (data: Country): Promise<Country | null> => {
  const result = await prisma.country.findUnique({
    where: {
      name: data.name,
      postalCode: data.postalCode,
      countryCode: data.countryCode,
    },
  });

  return result;
};

const findAllCountry = async (): Promise<Country[]> => {
  const result = await prisma.country.findMany({
    include: {
      idTypes: true,
    },
  });

  return result;
};

export const countryService = {
  insertIntoDB,
  findAll,
  updateById,
  deleteById,
  findOne,
  findAllCountry,
};
