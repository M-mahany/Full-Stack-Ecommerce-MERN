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
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const JsonWebToken_1 = require("../middleware/JsonWebToken");
dotenv_1.default.config();
const saltRounds = parseInt(process.env.SALT_ROUNDS);
const pepper = process.env.PEPPER;
const UpdateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.password;
    if (req.body.password) {
        const hash = bcrypt_1.default.hashSync(req.body.password + pepper, saltRounds);
        const UpdatedUser = yield user_1.default.findByIdAndUpdate(req.params.userId, {
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                password: hash,
                email: req.body.email,
            },
        }, { new: true });
        res.status(200).json(UpdatedUser);
    }
    else {
        res.status(400).json('please enter password');
    }
});
const DeleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_1.default.findByIdAndDelete(req.params.userId);
        res.status(200).json('user deleted successfully....');
    }
    catch (err) {
        res.status(500).json(`userId not exists Error:${err}`);
    }
});
const GetUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findById(req.params.id);
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json(`userId not exists Error:${err}`);
    }
});
const GetAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const AllUsers = yield user_1.default.find({});
        res.status(200).json(AllUsers);
    }
    catch (err) {
        res.status(500).json(`userId not exists Error:${err}`);
    }
});
const User_Routes = (app) => {
    app.put('/:userId', JsonWebToken_1.verifyTokenAuthorization, UpdateUser);
    app.delete('/:userId', JsonWebToken_1.verifyTokenAuthorization, DeleteUser);
    app.get('/:userId/userById/:id', JsonWebToken_1.verifyTokenAuthorizationAndAdmin, GetUserById);
    app.get('/:userId/users', JsonWebToken_1.verifyTokenAuthorizationAndAdmin, GetAllUsers);
};
exports.default = User_Routes;
