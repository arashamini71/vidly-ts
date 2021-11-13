"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(validator) {
    return function (req, res, next) {
        var error = validator(req.body).error;
        if (error)
            return res.status(404).send(error.details[0].message);
        next();
    };
}
exports.default = default_1;
