import express, { Request, Response } from "express";
import Movie from "../models/movie";
import Rental from "../models/rental";
import auth from "../middlewares/auth";
import validate from "../middlewares/validate";
import joi from "joi";

const router = express.Router();
router.post(
  "/",
  [auth, validate(validateReturn)],
  async (req: Request, res: Response) => {
    const rental = await Rental.lookup(req.body.customerId, req.body.movieId);
    if (!rental) res.status(404).send("rental not found");

    rental.return();
    await rental.save();

    await Movie.updateOne(
      { _id: rental.movie._id },
      { $inc: { numberInStock: 1 } }
    );
    return res.send(rental);
  }
);

function validateReturn(req: any) {
  const schema = joi.object({
    customerId: joi.string().required(),
    movieId: joi.string().required(),
  });
  return schema.validate(req, { stripUnknown: true, abortEarly: true });
}

export default router;
