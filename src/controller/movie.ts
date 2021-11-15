import { validateMovie } from "../models/movie";
import * as movieService from "../services/movie";
import * as genreService from "../services/genre";
import { Request, Response } from "express";

export async function getAll(req: Request, res: Response) {
  const movies = await movieService.getAll();
  res.send(movies);
}
export async function getById(req: Request, res: Response) {
  const movie = await movieService.getById(req.params.id);
  if (!movie)
    return res.status(404).send("the movie with the given ID was not found");

  res.send(movie);
}
export async function create(req: Request, res: Response) {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await genreService.getById(req.body.genreId);
  if (!genre) res.status(400).send("Invalid genre");

  let movie = await movieService.create(req.body, genre);
  movie = await movie.save();

  res.send(movie);
}
export async function update(req: Request, res: Response) {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await genreService.getById(req.body.genreId);
  if (!genre) res.status(400).send("Invalid genre");

  const movie = movieService.update(req.params.id, req.body, genre);
  if (!movie)
    return res.status(404).send("the movie with the given ID was not found");

  res.send(movie);
}
export async function deleteById(req: Request, res: Response) {
  const movie = await movieService.deleteById(req.body.id);
  if (!movie)
    return res.status(404).send("the movie with the given ID was not found");

  res.send(movie);
}
