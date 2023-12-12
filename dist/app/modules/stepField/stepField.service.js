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
exports.stepFildService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.stepFild.create({
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
});
const updateById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.stepFild.update({
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
});
const deleteById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.stepFild.delete({
        where: {
            id,
        },
    });
    return result;
});
const findOne = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.stepFild.findFirst({
        where: {
            name: payload.name,
            type: payload.type,
            countryId: payload.countryId,
            stepValue: payload.stepValue,
        },
    });
    return result;
});
exports.stepFildService = {
    insertIntoDB,
    updateById,
    deleteById,
    findOne,
};
