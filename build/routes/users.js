"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_1 = __importDefault(require("../middlewares/auth"));
var user_1 = require("../controller/user");
var router = express_1.default.Router();
router.get("/me", auth_1.default, user_1.getCurrent);
router.post("/", user_1.register);
exports.default = router;
