import generatePdfBuffer from "../../../utils/generatePdfBuffer";

const createPdf = async () => {
  const response = await generatePdfBuffer();
  return response;
};

export const explorePdfService = {
  createPdf,
};
