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
var express_1 = __importDefault(require("express"));
var auth_1 = __importDefault(require("../middlewares/auth"));
var validate_1 = __importDefault(require("../middlewares/validate"));
var joi_1 = __importDefault(require("joi"));
var returnController = __importStar(require("../controller/return"));
var router = express_1.default.Router();
router.post("/", [auth_1.default, (0, validate_1.default)(validateReturn)], returnController.returnMovie);
function validateReturn(req) {
    var schema = joi_1.default.object({
        customerId: joi_1.default.string().required(),
        movieId: joi_1.default.string().required(),
    });
    return schema.validate(req, { stripUnknown: true, abortEarly: true });
}
exports.default = router;
