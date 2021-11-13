import { Response, Request, NextFunction } from "express";
import logger from "../startup/logger";

export default function (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error(err.message);
  return res.status(500).send({ data: err.message });
}
