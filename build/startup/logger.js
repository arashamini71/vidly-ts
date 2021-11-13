"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeLogger = void 0;
var winston_1 = __importDefault(require("winston"));
var logger = winston_1.default.createLogger({
    level: "info",
    format: winston_1.default.format.json(),
    transports: [
        new winston_1.default.transports.File({ filename: "error.log", level: "error" }),
        new winston_1.default.transports.File({ filename: "combined.log" }),
    ],
});
function initializeLogger() {
    if (process.env.NODE_ENV !== "production") {
        logger.add(new winston_1.default.transports.Console({
            format: winston_1.default.format.simple(),
        }));
    }
}
exports.initializeLogger = initializeLogger;
exports.default = logger;
