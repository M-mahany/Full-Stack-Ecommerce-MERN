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
exports.Orders_Routes = void 0;
const JsonWebToken_1 = require("../middleware/JsonWebToken");
const order_1 = __importDefault(require("../models/order"));
//Checkout by adding cart info to Order Schema
const Checkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const products = req.body.products;
    const amount = req.body.amount;
    try {
        const existOrderPending = yield order_1.default.findOne({
            userId: userId,
            status: 'pending',
        });
        if (!existOrderPending) {
            const newOrder = new order_1.default({
                userId: userId,
                products,
                amount: amount,
            });
            const savedOrder = yield newOrder.save();
            res.status(200).json(savedOrder);
        }
        else {
            yield order_1.default.updateOne({
                userId: userId,
                status: 'pending',
            }, {
                products,
                amount: amount,
            }, { new: true });
            res.status(200).json('order Updated Successfully!');
        }
    }
    catch (err) {
        res.status(400).json('cannot create order' + err);
    }
});
const fetchOrderByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const response = yield order_1.default.findOne({
            userId: userId,
            status: 'pending',
        });
        res.status(200).json(response);
    }
    catch (err) {
        res.status(400).json(`Error Fetching Order ${err}`);
    }
});
const updateCartAndComplete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const address = req.body.address;
    const payment = req.body.payment;
    try {
        yield order_1.default.findByIdAndUpdate({ _id: req.body.orderId }, {
            $push: { address: address },
            payment: payment,
            status: 'packing',
        }, { new: true });
        res.status(200).json('order Completed');
    }
    catch (err) {
        res.status(400).json('unknown Error:' + err);
    }
});
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_1.default.find({});
        res.status(200).json(orders);
    }
    catch (err) {
        res.status(400).json('unable to load all orders' + err);
    }
});
const Orders_Routes = (app) => {
    app.post('/order/:userId', JsonWebToken_1.verifyTokenAuthorization, Checkout);
    app.get('/order/:userId', JsonWebToken_1.verifyTokenAuthorization, fetchOrderByUser);
    app.put('/order/:userId', JsonWebToken_1.verifyTokenAuthorization, updateCartAndComplete);
    app.get('/allOrders/:userId', JsonWebToken_1.verifyTokenAuthorizationAndAdmin, getAllOrders);
};
exports.Orders_Routes = Orders_Routes;
