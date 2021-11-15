import { validateGenre } from "../models/genre";
import * as genreService from "../services/genre";
import { Request, Response } from "express";

export async function getAll(req: Request, res: Response) {
  const genres = await genreService.getAll();
  res.send(genres);
}
export async function getById(req: Request, res: Response) {
  const genre = await genreService.getById(req.params.id);
  if (!genre)
    return res.status(404).send("the genre with the given ID was not found");

  res.send(genre);
}
export async function create(req: Request, res: Response) {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = await genreService.create(req.body);
  genre = await genre.save();

  res.send(genre);
}
export async function update(req: Request, res: Response) {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = genreService.update(req.params.id, req.body);
  if (!genre)
    return res.status(404).send("the genre with the given ID was not found");

  res.send(genre);
}
export async function deleteById(req: Request, res: Response) {
  const genre = await genreService.deleteById(req.body.id);
  if (!genre)
    return res.status(404).send("the genre with the given ID was not found");

  res.send(genre);
}
