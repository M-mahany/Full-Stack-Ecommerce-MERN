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
exports.verifyTokenAuthorizationAndAdmin = exports.verifyTokenAuthorization = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const verifyTokenAuthorization = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader === null || authorizationHeader === void 0 ? void 0 : authorizationHeader.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_KEY);
        if (decoded.id !== req.params.userId) {
            throw new Error('You are not allowed userId mismatch');
        }
        else {
            next();
        }
    }
    catch (err) {
        res.status(401).json(`Invalid token ${err}`);
    }
};
exports.verifyTokenAuthorization = verifyTokenAuthorization;
const verifyTokenAuthorizationAndAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader === null || authorizationHeader === void 0 ? void 0 : authorizationHeader.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_KEY);
        if (decoded.id !== req.params.userId) {
            throw new Error('You are not allowed userId mismatch');
        }
        else {
            if (decoded.isAdmin) {
                next();
            }
            else {
                throw new Error('Your accound is not admin');
            }
        }
    }
    catch (err) {
        res.status(401).json(`access denied Invalid token Error:${err}`);
    }
});
exports.verifyTokenAuthorizationAndAdmin = verifyTokenAuthorizationAndAdmin;
exports.default = { verifyTokenAuthorization: exports.verifyTokenAuthorization, verifyTokenAuthorizationAndAdmin: exports.verifyTokenAuthorizationAndAdmin };
