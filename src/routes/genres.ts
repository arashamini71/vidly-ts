import express from "express";
import auth from "../middlewares/auth";
import Genre, { validateGenre } from "../models/genre";
import admin from "../middlewares/admin";

const router = express.Router();

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  return res.send(genres);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res.status(404).send("the genre with the given ID was not found");

  res.send(genre);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({
    name: req.body.name,
  });
  genre = await genre.save();

  res.send(genre);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = Genre.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true }
  );
  if (!genre)
    return res.status(404).send("the genre with the given ID was not found");

  res.send(genre);
});

router.delete("/:id", [auth, admin], async (req: any, res: any) => {
  const genre = await Genre.findByIdAndRemove(req.body.id);
  if (!genre)
    return res.status(404).send("the genre with the given ID was not found");

  res.send(genre);
});

export default router;
