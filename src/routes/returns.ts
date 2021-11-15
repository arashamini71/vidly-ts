import express from "express";
import auth from "../middlewares/auth";
import validate from "../middlewares/validate";
import joi from "joi";
import * as returnController from "../controller/return";

const router = express.Router();
router.post(
  "/",
  [auth, validate(validateReturn)],
  returnController.returnMovie
);

function validateReturn(req: any) {
  const schema = joi.object({
    customerId: joi.string().required(),
    movieId: joi.string().required(),
  });
  return schema.validate(req, { stripUnknown: true, abortEarly: true });
}

export default router;
