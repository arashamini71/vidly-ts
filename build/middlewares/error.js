"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = __importDefault(require("../startup/logger"));
function default_1(err, req, res, next) {
    logger_1.default.error(err.message);
    return res.status(500).send({ data: err.message });
}
exports.default = default_1;
