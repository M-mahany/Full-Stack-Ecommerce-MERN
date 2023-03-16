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
const product_1 = require("../controllers/product");
const JsonWebToken_1 = require("../middleware/JsonWebToken");
const product_2 = __importDefault(require("../models/product"));
//Create
const CreateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newProduct = new product_2.default(req.body);
    try {
        const savedProduct = yield newProduct.save();
        res.status(200).json(savedProduct);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
//Update
const UpdateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_2.default.findByIdAndUpdate(req.params.productId, { $set: req.body }, { new: true });
        res.status(200).json(product);
    }
    catch (err) {
        res.status(404).json(err);
    }
});
//Delete
const DeleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield product_2.default.findByIdAndDelete(req.params.productId);
        res.status(200).json('Product Deleted Successfully');
    }
    catch (err) {
        res.status(404).json(err);
    }
});
//Get all
const fetchProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = req.query.category;
    try {
        if (!category) {
            const allProducts = yield (0, product_1.getAllProducts)();
            res.status(200).json(allProducts);
        }
        else {
            const productByCategory = yield (0, product_1.getProductsByCategory)(category);
            res.status(200).json(productByCategory);
        }
    }
    catch (err) {
        res.status(400).json(err);
    }
});
//Get by id
const productById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_2.default.findById(req.params.productId);
        res.status(200).json(product);
    }
    catch (err) {
        res.status(404).json(err);
    }
});
const Product_Routes = (app) => {
    app.post('/product/:userId', JsonWebToken_1.verifyTokenAuthorizationAndAdmin, CreateProduct);
    app.put('/product/:productId/:userId', JsonWebToken_1.verifyTokenAuthorizationAndAdmin, UpdateProduct);
    app.delete('/product/:productId/:userId', JsonWebToken_1.verifyTokenAuthorizationAndAdmin, DeleteProduct);
    app.get('/products', fetchProduct);
    app.get('/product/:productId', productById);
};
exports.default = Product_Routes;
