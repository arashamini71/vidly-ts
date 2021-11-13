"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongo = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
function connectMongo() {
    var MONGO_URI = process.env.MONGO_URI || "mongodb://localhost/vidly";
    return mongoose_1.default.connect(MONGO_URI);
}
exports.connectMongo = connectMongo;
