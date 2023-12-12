import pdf from "html-pdf";

const generatePdfBuffer = async () => {
  console.log("call");

  const htmlTemp = `<div><h2>Hello world.. This is PDF</h2></div>`;

  return new Promise((resolve, reject) => {
    pdf.create(htmlTemp, { format: "A4" }).toBuffer((err, buffer) => {
      if (err) {
        console.error("PDF generation error:", err);
        reject(err);
      } else {
        resolve(buffer);
        console.log(buffer);
      }
    });
  });
};

export default generatePdfBuffer;
