"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeMiddlewares = void 0;
var express_1 = __importDefault(require("express"));
var users_1 = __importDefault(require("../routes/users"));
var auth_1 = __importDefault(require("../routes/auth"));
var genres_1 = __importDefault(require("../routes/genres"));
var movies_1 = __importDefault(require("../routes/movies"));
var customers_1 = __importDefault(require("../routes/customers"));
var rentals_1 = __importDefault(require("../routes/rentals"));
var returns_1 = __importDefault(require("../routes/returns"));
var error_1 = __importDefault(require("../middlewares/error"));
function initializeMiddlewares(app) {
    app.use(express_1.default.json());
    app.use("/api/users", users_1.default);
    app.use("/api/auth", auth_1.default);
    app.use("/api/genres", genres_1.default);
    app.use("/api/movies", movies_1.default);
    app.use("/api/customers", customers_1.default);
    app.use("/api/rentals", rentals_1.default);
    app.use("/api/returns", returns_1.default);
    app.all("*", function (req, res) {
        res.sendStatus(404);
    });
    app.use(error_1.default);
}
exports.initializeMiddlewares = initializeMiddlewares;
