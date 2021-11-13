"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMovie = void 0;
var joi_1 = __importDefault(require("joi"));
var mongoose_1 = __importStar(require("mongoose"));
var movieSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    genre: { type: mongoose_1.Schema.Types.ObjectId, ref: "genre", required: true },
    numberInStock: { type: Number, required: true },
    dailyRentalRate: { type: Number, required: true },
});
var Movie = mongoose_1.default.model("movie", movieSchema);
function validateMovie(movie) {
    var schema = joi_1.default.object({
        title: joi_1.default.string().required(),
        genreId: joi_1.default.string().required(),
        numberInStock: joi_1.default.string().required(),
        dailyRentalRate: joi_1.default.string().required(),
    });
    return schema.validate(movie, { stripUnknown: true, abortEarly: true });
}
exports.validateMovie = validateMovie;
exports.default = Movie;
