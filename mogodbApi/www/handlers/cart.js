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
const JsonWebToken_1 = require("../middleware/JsonWebToken");
const cart_1 = __importDefault(require("../models/cart"));
const cart_2 = require("../controllers/cart");
const AddToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const existCart = yield cart_1.default.findOne({
        userId: req.params.userId,
    });
    const existProduct = yield cart_1.default.findOne({ userId: req.params.userId, 'products._id': req.body.productId }, {
        products: { $elemMatch: { _id: req.body.productId } },
    });
    try {
        if (existCart) {
            if (existProduct) {
                yield (0, cart_2.incrementProductQuantity)(req.params.userId, req.body.productId, req.body.quantity);
                res.status(200).json('product quantity updated!');
            }
            else {
                const AddProductToCart = yield cart_1.default.findOneAndUpdate({
                    userId: req.params.userId,
                }, {
                    $addToSet: {
                        products: {
                            _id: req.body.productId,
                            quantity: req.body.quantity,
                            price: req.body.price,
                            img: req.body.img,
                            title: req.body.title,
                        },
                    },
                }, { new: true });
                res.status(200).json(AddProductToCart);
            }
        }
        else {
            const newCart = new cart_1.default({
                userId: req.params.userId,
                products: {
                    _id: req.body.productId,
                    quantity: req.body.quantity,
                    price: req.body.price,
                    img: req.body.img,
                    title: req.body.title,
                },
            });
            const savedCart = yield newCart.save();
            res.status(200).json(savedCart);
        }
    }
    catch (err) {
        res.status(500).json('Error adding item to cart Error:' + err);
    }
});
const ProductQuantityDec = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (parseInt(req.body.quantity) > 1) {
            yield (0, cart_2.setProductQuantityDec)(req.params.userId, req.body.productId);
            res.status(200).json('product quantity Dec');
        }
        else {
            yield (0, cart_2.deleteCartProduct)(req.params.userId, req.body.productId);
            res.status(200).json('product removed from cart');
        }
    }
    catch (err) {
        res.status(500).json('Error Processing' + err);
    }
});
const deleteProductFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, cart_2.deleteCartProduct)(req.params.userId, req.body.productId);
        res.status(200).json('product deleted successfully!');
    }
    catch (err) {
        res.status(400).json(`error proccessing Error:${err}`);
    }
});
const ProductQuantityInc = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, cart_2.setProductQuantityInc)(req.params.userId, req.body.productId);
        res.status(200).json('product quantity Inc');
    }
    catch (err) {
        res.status(500).json('Error Processing' + err);
    }
});
const showCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cart = yield cart_1.default.findOne({
            userId: req.params.userId,
        });
        res.status(200).json(cart);
    }
    catch (err) {
        res.status(404).json('unable to process cart Erro:' + err);
    }
});
const deleteCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedCart = yield cart_1.default.deleteOne({
            userId: req.params.userId,
        });
        res.status(200).json(deletedCart);
    }
    catch (err) {
        res.status(500).json('Error processing Request' + err);
    }
});
const Cart_Routes = (app) => {
    app.post('/cart/:userId', JsonWebToken_1.verifyTokenAuthorization, AddToCart);
    app.put('/cartDec/:userId', JsonWebToken_1.verifyTokenAuthorization, ProductQuantityDec);
    app.put('/cartInc/:userId', JsonWebToken_1.verifyTokenAuthorization, ProductQuantityInc);
    app.get('/cart/:userId', JsonWebToken_1.verifyTokenAuthorization, showCart);
    app.delete('/cart/:userId', JsonWebToken_1.verifyTokenAuthorization, deleteCart);
    app.put('/cart-product/:userId', JsonWebToken_1.verifyTokenAuthorization, deleteProductFromCart);
};
exports.default = Cart_Routes;
