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
exports.validateRental = void 0;
var joi_1 = __importDefault(require("joi"));
var mongoose_1 = __importStar(require("mongoose"));
var moment_1 = __importDefault(require("moment"));
var movieSchema = new mongoose_1.Schema({
    customer: { type: mongoose_1.Schema.Types.ObjectId, ref: "customer", required: true },
    movie: { type: mongoose_1.Schema.Types.ObjectId, ref: "movie", required: true },
    dateOut: { type: Date, default: Date.now },
    dateReturned: { type: Date },
    rentalFee: { type: Number, min: 0 },
});
movieSchema.methods.return = function () {
    this.dateReturned = new Date();
    var days = (0, moment_1.default)().diff(this.dateOut, "days");
    this.rentalFee = days * this.movie.rentalFee;
};
movieSchema.statics.lookup = function (customerId, movieId) {
    Rental.find({ customerId: customerId, movieId: movieId });
};
var Rental = mongoose_1.default.model("rental", movieSchema);
function validateRental(rental) {
    var schema = joi_1.default.object({
        customerId: joi_1.default.string().required(),
        movieId: joi_1.default.string().required(),
        dateOut: joi_1.default.date(),
        dateReturned: joi_1.default.date(),
        rentalFee: joi_1.default.number().min(0),
    });
    return schema.validate(rental, { stripUnknown: true, abortEarly: true });
}
exports.validateRental = validateRental;
exports.default = Rental;
