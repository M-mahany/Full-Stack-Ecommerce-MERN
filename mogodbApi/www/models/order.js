"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const OrderSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    products: [
        {
            _id: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: { type: Number, default: 1 },
            price: { type: Number, required: true },
            img: { type: String, required: true },
            title: { type: String, required: true },
        },
    ],
    amount: { type: Number, required: true },
    address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        zip: { type: String },
    },
    payment: { type: String },
    status: { type: String, default: 'pending' },
}, { timestamps: true });
exports.default = mongoose_1.default.model('Order', OrderSchema);
