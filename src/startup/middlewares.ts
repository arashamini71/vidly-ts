import { Application, Request, Response } from "express";
import express from "express";
import users from "../routes/users";
import auth from "../routes/auth";
import genres from "../routes/genres";
import movies from "../routes/movies";
import customers from "../routes/customers";
import rentals from "../routes/rentals";
import returns from "../routes/returns";
import error from "../middlewares/error";

export function initializeMiddlewares(app: Application): void {
  app.use(express.json());

  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/genres", genres);
  app.use("/api/movies", movies);
  app.use("/api/customers", customers);
  app.use("/api/rentals", rentals);
  app.use("/api/returns", returns);

  app.all("*", (req: Request, res: Response) => {
    res.sendStatus(404);
  });

  app.use(error);
}
