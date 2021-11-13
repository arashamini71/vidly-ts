import express from "express";
import Movie, { validateMovie } from "../models/movie";
import Genre from "../models/genre";
import auth from "../middlewares/auth";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const moives = await Movie.find().sort("name");
  return res.send(moives);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) res.status(400).send("Invalid genre");

  const movie = new Movie({
    title: req.body.title,
    genre: genre,
    dailyRentalRate: req.body.dailyRentalRate,
    numberInStock: req.body.numberInStock,
  });
  await movie.save();

  return res.send(movie);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) res.status(400).send("Invalid genre");

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: genre,
      dailyRentalRate: req.body.dailyRentalRate,
      numberInStock: req.body.numberInStock,
    },
    { new: true }
  );

  if (!movie) res.status(404).send("the movie with the given ID was not found");

  return res.send(movie);
});

router.delete("/:id", auth, async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);
  if (!movie) res.status(404).send("the movie with the given ID was not found");

  return res.send(movie);
});

router.get("/:id", auth, async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) res.status(404).send("the movie with the given ID was not found");

  return res.send(movie);
});

export default router;
