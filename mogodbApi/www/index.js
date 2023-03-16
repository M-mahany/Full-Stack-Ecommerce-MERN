"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_1 = __importDefault(require("./handlers/auth"));
const product_1 = __importDefault(require("./handlers/product"));
const user_1 = __importDefault(require("./handlers/user"));
const cart_1 = __importDefault(require("./handlers/cart"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const order_1 = require("./handlers/order");
const stripe_1 = require("./handlers/stripe");
const awsUpload_1 = require("./handlers/awsUpload");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
(0, auth_1.default)(app);
(0, user_1.default)(app);
(0, product_1.default)(app);
(0, cart_1.default)(app);
(0, order_1.Orders_Routes)(app);
(0, stripe_1.Stripe_Routes)(app);
(0, awsUpload_1.AWS_ROUTE)(app);
mongoose_1.default.set('strictQuery', false);
mongoose_1.default
    .connect(process.env.MONGO_URL)
    .then(() => console.log('mongodb is connected!'));
app.get('/', (_req, res) => {
    res.send('Main Api Endpoint');
});
app.listen(port, () => {
    console.log(`app is connected successfully to server ${port}`);
});
exports.default = app;
