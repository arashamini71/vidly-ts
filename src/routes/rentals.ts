import express from "express";
import Rental, { validateRental } from "../models/rental";
import Genre from "../models/genre";
import auth from "../middlewares/auth";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const rentals = await Rental.find().sort("dateOut");
  return res.send(rentals);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateRental(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const movie = await Genre.findById(req.body.movieId);
  if (!movie) res.status(400).send("Invalid genre");

  const customer = await Genre.findById(req.body.customerId);
  if (!customer) res.status(400).send("Invalid customer");

  const rental = new Rental({
    customer: customer,
    movie: movie,
    dateOut: req.body.dateOut,
    dateReturned: req.body.dateReturned,
    rentalFee: req.body.rentalFee,
  });
  await rental.save();

  return res.send(rental);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validateRental(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const movie = await Genre.findById(req.body.movieId);
  if (!movie) res.status(400).send("Invalid genre");

  const customer = await Genre.findById(req.body.customerId);
  if (!customer) res.status(400).send("Invalid customer");

  const rental = await Rental.findByIdAndUpdate(
    req.params.id,
    {
      customer: customer,
      movie: movie,
      dateOut: req.body.dateOut,
      dateReturned: req.body.dateReturned,
      rentalFee: req.body.rentalFee,
    },
    { new: true }
  );

  if (!rental)
    res.status(404).send("the rental with the given ID was not found");

  return res.send(rental);
});

router.delete("/:id", auth, async (req, res) => {
  const rental = await Rental.findByIdAndRemove(req.params.id);
  if (!rental)
    res.status(404).send("the rental with the given ID was not found");

  return res.send(rental);
});

router.get("/:id", auth, async (req, res) => {
  const rental = await Rental.findById(req.params.id);
  if (!rental)
    res.status(404).send("the rental with the given ID was not found");

  return res.send(rental);
});

export default router;
