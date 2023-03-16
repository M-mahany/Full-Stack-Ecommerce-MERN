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
exports.Stripe_Routes = void 0;
const stripe_1 = __importDefault(require("stripe"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const stripe = new stripe_1.default(process.env.STRIPE_KEY, {
    apiVersion: '2022-11-15',
});
const StripePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resposne = yield stripe.charges.create({
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: 'USD',
        });
        res.status(200).json(resposne);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
const Stripe_Routes = (app) => {
    app.post('/payment', StripePayment);
};
exports.Stripe_Routes = Stripe_Routes;
