import { validateRental } from "../models/rental";
import * as rentalService from "../services/rental";
import * as customerService from "../services/customer";
import * as movieService from "../services/movie";
import { Request, Response } from "express";

export async function getAll(req: Request, res: Response) {
  const rentals = await rentalService.getAll();
  res.send(rentals);
}
export async function getById(req: Request, res: Response) {
  const rental = await rentalService.getById(req.params.id);
  if (!rental)
    return res.status(404).send("the rental with the given ID was not found");

  res.send(rental);
}
export async function create(req: Request, res: Response) {
  const { error } = validateRental(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const movie = await movieService.getById(req.body.movieId);
  if (!movie) res.status(400).send("Invalid movie");

  const customer = await customerService.getById(req.body.customerId);
  if (!customer) res.status(400).send("Invalid customer");

  let rental = await rentalService.create(req.body, customer, movie);
  rental = await rental.save();

  res.send(rental);
}
export async function update(req: Request, res: Response) {
  const { error } = validateRental(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const movie = await movieService.getById(req.body.movieId);
  if (!movie) res.status(400).send("Invalid movie");

  const customer = await customerService.getById(req.body.customerId);
  if (!customer) res.status(400).send("Invalid customer");

  const rental = rentalService.update(req.params.id, req.body, customer, movie);
  if (!rental)
    return res.status(404).send("the rental with the given ID was not found");

  res.send(rental);
}
export async function deleteById(req: Request, res: Response) {
  const rental = await rentalService.deleteById(req.body.id);
  if (!rental)
    return res.status(404).send("the rental with the given ID was not found");

  res.send(rental);
}
