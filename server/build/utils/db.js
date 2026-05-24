"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv").config();
//connect to db using ts
const uri = process.env.DB_URI || " ";
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(uri).then((data) => {
            console.log(`Connected to db ${data.connection.host}`);
        });
    }
    catch (error) {
        console.log(error.message);
        setTimeout(exports.connectDB, 5000);
    }
};
exports.connectDB = connectDB;
