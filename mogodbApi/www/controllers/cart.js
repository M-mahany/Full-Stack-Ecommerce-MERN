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
exports.deleteCartProduct = exports.setProductQuantityInc = exports.setProductQuantityDec = exports.incrementProductQuantity = void 0;
const cart_1 = __importDefault(require("../models/cart"));
const incrementProductQuantity = (userId, productId, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    yield cart_1.default.updateOne({
        userId: userId,
        'products._id': productId,
    }, {
        $inc: { 'products.$.quantity': +quantity },
    }, { new: true });
});
exports.incrementProductQuantity = incrementProductQuantity;
const setProductQuantityDec = (userId, productId) => __awaiter(void 0, void 0, void 0, function* () {
    yield cart_1.default.updateOne({
        userId: userId,
        'products._id': productId,
    }, {
        $inc: { 'products.$.quantity': -1 },
    }, { new: true });
});
exports.setProductQuantityDec = setProductQuantityDec;
const setProductQuantityInc = (userId, productId) => __awaiter(void 0, void 0, void 0, function* () {
    yield cart_1.default.updateOne({
        userId: userId,
        'products._id': productId,
    }, {
        $inc: { 'products.$.quantity': +1 },
    }, { new: true });
});
exports.setProductQuantityInc = setProductQuantityInc;
const deleteCartProduct = (userId, productId) => __awaiter(void 0, void 0, void 0, function* () {
    yield cart_1.default.updateOne({ userId: userId }, { $pull: { products: { _id: productId } } }, { safe: true, multi: true });
});
exports.deleteCartProduct = deleteCartProduct;
