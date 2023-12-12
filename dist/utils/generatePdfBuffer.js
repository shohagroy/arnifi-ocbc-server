"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const html_pdf_1 = __importDefault(require("html-pdf"));
const generatePdfBuffer = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("call");
    const htmlTemp = `<div><h2>Hello world.. This is PDF</h2></div>`;
    return new Promise((resolve, reject) => {
        html_pdf_1.default.create(htmlTemp, { format: "A4" }).toBuffer((err, buffer) => {
            if (err) {
                console.error("PDF generation error:", err);
                reject(err);
            }
            else {
                resolve(buffer);
                console.log(buffer);
            }
        });
    });
});
exports.default = generatePdfBuffer;
