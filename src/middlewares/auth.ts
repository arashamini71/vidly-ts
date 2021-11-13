import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.header("x-auth-token");
  console.log(token);

  if (!token) return res.status(401).send("Access denied. No token provided.");
  try {
    const JWT_SECRET = process.env.JWT_SECRET ?? "JWT_SECRET";
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({ _id: decoded.sub });
    if (!user) res.status(400).send("Invalid token");
    req.body.user = user;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token");
  }
}
