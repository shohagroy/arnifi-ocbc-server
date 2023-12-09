import { StepFild } from "@prisma/client";
import prisma from "../../../shared/prisma";

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

export const stepFildService = {
  insertIntoDB,
  updateById,
  deleteById,
  findOne,
};
