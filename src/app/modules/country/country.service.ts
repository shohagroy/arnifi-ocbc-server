import { Country } from "@prisma/client";
import prisma from "../../../shared/prisma";

const insertIntoDB = async (data: Country): Promise<Country> => {
  const result = await prisma.country.create({
    data,
  });

  return result;
};

const findALl = async (): Promise<Country[]> => {
  const result = await prisma.country.findMany({});

  return result;
};

const updateById = async (
  id: string,
  payload: Partial<Country>
): Promise<Country | null> => {
  const result = await prisma.country.update({
    where: { id },
    data: payload,
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

export const countryService = {
  insertIntoDB,
  findALl,
  updateById,
  deleteById,
};
