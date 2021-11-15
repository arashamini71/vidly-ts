import * as rentalService from "../services/rental";
import * as movieService from "../services/movie";
import { Request, Response } from "express";
import _ from "lodash";

export async function returnMovie(req: Request, res: Response) {
  const rental = await rentalService.getByCustomerIdAndMovieId(
    req.body.customerId,
    req.body.movieId
  );
  if (!rental) res.status(404).send("rental not found");

  rental.return();
  await rental.save();

  await movieService.incNumberInStock(rental.movie._id);
  return res.send(rental);
}
