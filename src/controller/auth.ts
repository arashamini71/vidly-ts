import * as userServie from "../services/user";
import { Request, Response } from "express";
import _ from "lodash";
import joi, { ValidationResult } from "joi";

export async function authenticate(req: Request, res: Response) {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await userServie.getByEmail(req.body.email);
  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword = await user.comparePassword(req.body.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  const token = user.generateAuthToken();
  return res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
}

function validate(data: any): ValidationResult {
  const schema = joi.object({
    email: joi.string().required().email(),
    password: joi.string().required(),
  });
  return schema.validate(data, { stripUnknown: true, abortEarly: true });
}
