"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeMiddlewares = void 0;
var express_1 = __importDefault(require("express"));
var users_1 = __importDefault(require("../routes/users"));
var error_1 = __importDefault(require("../middlewares/error"));
function initializeMiddlewares(app) {
    app.use(express_1.default.json());
    app.use("/api/users", users_1.default);
    app.all("*", function (req, res) {
        res.sendStatus(404);
    });
    app.use(error_1.default);
}
exports.initializeMiddlewares = initializeMiddlewares;
