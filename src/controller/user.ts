import User, { validateUser } from "../models/user";
import * as userServie from "../services/user";
import { Request, Response } from "express";
import _ from "lodash";

export async function getCurrent(req: Request, res: Response) {
  const user = await userServie.getById(req.body.userId);
  return res.send(_.pick(user, ["_id", "name", "email"]));
}

export async function register(req: Request, res: Response) {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");

  user = await userServie.create(req.body);

  const token = user.generateAuthToken();
  return res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
}
