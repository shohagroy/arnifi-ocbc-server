// import html_to_pdf from "html-pdf-node";
// import puppeteer from "puppeteer";
import pdf from "html-pdf";

const generatePdfBuffer = async () => {
  // const browser = await puppeteer.launch({ headless: "new" });
  // const page = await browser.newPage();
  // await page.setContent(htmlTemp);
  // const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
  // await browser.close();
  // return pdfBuffer;
  // _____________________________________
  // const pdfBuffer = await page.pdf();
  // let options = { format: "A4" };
  // let file = { content: htmlTemp };
  // const pdf = await html_to_pdf.generatePdf(file, options);
  // return pdf;
  // ______________________________________

  const htmlTemp = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
    </head>
    <body>
      this is demo will page
    </body>
  </html>
  `;
  // const options = { format: "A4" };
  // const buffer = await pdf
  //   .create(htmlTemp, { format: "A4" })
  //   .toBuffer((err, buffer) => {
  //     if (err) {
  //       console.error("PDF generation error:", err);
  //       throw err;
  //     }
  //     return buffer;
  //   });

  return new Promise((resolve, reject) => {
    pdf.create(htmlTemp, { format: "A4" }).toBuffer((err, buffer) => {
      if (err) {
        console.error("PDF generation error:", err);
        reject(err);
      } else {
        resolve(buffer);
      }
    });
  });
};

export default generatePdfBuffer;
