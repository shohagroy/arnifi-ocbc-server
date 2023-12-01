import { Prisma, User } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IUserFilters } from "./user.interface";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { userSearchableFields } from "./user.constants";

const getAllUserToDb = async (
  paginationOptions: IPaginationOptions,
  filters: IUserFilters
) => {
  const { size, page, skip } =
    paginationHelpers.calculatePagination(paginationOptions);
  const { search, ...filterData } = filters;

  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: userSearchableFields.map((field) => ({
        [field]: {
          contains: search,
          mode: "insensitive",
        },
      })),
    });
  }
  if (filterData) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => {
        if (key === "role") {
          return {
            role: {
              equals: filterData[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.UserWhereInput | {} =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.user.findMany({
    where: whereConditions,
    include: {},
    take: size,
    skip,
  });

  const total = await prisma.user.count({
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

const getSingleUserToDb = async (id: string): Promise<Partial<User | null>> => {
  const result = await prisma.user.findFirst({
    where: {
      id,
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      contact: true,
      address: true,
      gender: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

const updateUserDataToDb = async (
  id: string,
  payload: Partial<User>
): Promise<Partial<User | null>> => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
    include: {
      address: true,
    },
  });

  return result;
};

const deleteUserToDb = async (id: string): Promise<Partial<User | null>> => {
  const result = prisma.$transaction(async (transactionClient) => {
    const userInfo = await transactionClient.user.delete({
      where: {
        id: id,
      },
    });

    return userInfo;
  });

  return result;
};

const findByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      address: true,
    },
  });

  return user;
};

const insertUserToDB = async (data: User): Promise<User> => {
  const result = await prisma.$transaction(async (transactionClient) => {
    const userInfo = await transactionClient.user.create({
      data: {
        email: data.email,
        fullName: data.fullName,
        password: data.password,
        role: data.role,
      },
    });

    return userInfo;
  });

  return result;
};

export const userService = {
  findByEmail,
  insertUserToDB,
  getAllUserToDb,
  getSingleUserToDb,
  updateUserDataToDb,
  deleteUserToDb,
};
