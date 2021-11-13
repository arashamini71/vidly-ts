import joi, { ValidationResult } from "joi";
import mongoose, { Document, Schema } from "mongoose";
import { IGenre } from "../models/genre";

interface IMovieInput {
  title: string;
  genre: IGenre["_id"];
  numberInStock: number;
  dailyRentalRate: number;
}

export interface IMovie extends IMovieInput, Document {}

const movieSchema = new Schema({
  title: { type: String, required: true },
  genre: { type: Schema.Types.ObjectId, ref: "genre", required: true },
  numberInStock: { type: Number, required: true },
  dailyRentalRate: { type: Number, required: true },
});

const Movie = mongoose.model<IMovie>("movie", movieSchema);

export function validateMovie(movie: IMovieInput): ValidationResult {
  const schema = joi.object({
    title: joi.string().required(),
    genreId: joi.string().required(),
    numberInStock: joi.string().required(),
    dailyRentalRate: joi.string().required(),
  });

  return schema.validate(movie, { stripUnknown: true, abortEarly: true });
}

export default Movie;
