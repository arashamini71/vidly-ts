import { NextFunction, Request, Response } from "express";

export default function (validator: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = validator(req.body);
    if (error) return res.status(404).send(error.details[0].message);
    next();
  };
}
