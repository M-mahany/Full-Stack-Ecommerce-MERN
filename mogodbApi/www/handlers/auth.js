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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const saltRounds = parseInt(process.env.SALT_ROUNDS);
const pepper = process.env.PEPPER;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = new user_1.default({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: bcrypt_1.default.hashSync(req.body.password + pepper, saltRounds),
        email: req.body.email,
    });
    try {
        const savedUser = yield newUser.save();
        res.status(200).json(savedUser);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userPassword = req.body.password;
    const user = yield user_1.default.findOne({
        username: req.body.username,
    });
    if (!user) {
        res.status(404).json('username not found!');
    }
    else {
        if (bcrypt_1.default.compareSync(userPassword + pepper, user.password)) {
            const token = jsonwebtoken_1.default.sign({
                id: user._id,
                isAdmin: user.isAdmin,
            }, process.env.TOKEN_KEY, {
                expiresIn: '3d',
            });
            res.status(200).json(Object.assign(Object.assign({}, user), { token }));
        }
        else {
            res.status(400).json('Wrong password!');
        }
    }
});
const Auth_Routes = (app) => {
    app.post('/auth/register', createUser);
    app.post('/auth/login', Login);
};
exports.default = Auth_Routes;
