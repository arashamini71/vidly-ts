import joi, { ValidationResult } from "joi";
import mongoose, { Schema, Document } from "mongoose";

interface IGenreInput {
  name: string;
}

export interface IGenre extends IGenreInput, Document {}

const genreSchema = new Schema({
  name: { type: String, required: true },
});

const Genre = mongoose.model<IGenre>("genre", genreSchema);

export function validateGenre(genre: IGenreInput): ValidationResult {
  const schema = joi.object({
    name: joi.string().required(),
  });
  return schema.validate(genre, { stripUnknown: true, abortEarly: true });
}

export default Genre;
