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
exports.validateCustomer = void 0;
var joi_1 = __importDefault(require("joi"));
var mongoose_1 = __importStar(require("mongoose"));
var customerSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    isGold: { type: Boolean, default: false },
    phone: { type: String, required: true },
});
var Customer = mongoose_1.default.model("customer", customerSchema);
function validateCustomer(customer) {
    var schema = joi_1.default.object({
        name: joi_1.default.string().required(),
        phone: joi_1.default.string().required(),
    });
    return schema.validate(customer, { abortEarly: true, stripUnknown: true });
}
exports.validateCustomer = validateCustomer;
exports.default = Customer;
