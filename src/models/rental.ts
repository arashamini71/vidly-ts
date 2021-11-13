import joi, { ValidationResult } from "joi";
import mongoose, { Document, Schema, Model } from "mongoose";
import moment from "moment";
import { IMovie } from "../models/movie";
import { ICustomer } from "../models/customer";

interface IRentalInput {
  customer: ICustomer["_id"];
  movie: IMovie["_id"];
}

export interface IRentalDocument extends IRentalInput, Document {
  dateOut: Date;
  dateReturned: Date;
  rentalFee: number;

  return(): void;
}

interface IRentalModel extends Model<IRentalDocument> {
  lookup: (customerId: string, movieId: string) => Promise<IRentalDocument>;
}

const movieSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: "customer", required: true },
  movie: { type: Schema.Types.ObjectId, ref: "movie", required: true },
  dateOut: { type: Date, default: Date.now },
  dateReturned: { type: Date },
  rentalFee: { type: Number, min: 0 },
});

movieSchema.methods.return = function () {
  this.dateReturned = new Date();
  const days = moment().diff(this.dateOut, "days");
  this.rentalFee = days * this.movie.rentalFee;
};

movieSchema.statics.lookup = function (customerId: string, movieId: string) {
  Rental.find({ customerId: customerId, movieId: movieId });
};

const Rental = mongoose.model<IRentalDocument, IRentalModel>(
  "rental",
  movieSchema
);

export function validateRental(rental: IRentalInput): ValidationResult {
  const schema = joi.object({
    customerId: joi.string().required(),
    movieId: joi.string().required(),
    dateOut: joi.date(),
    dateReturned: joi.date(),
    rentalFee: joi.number().min(0),
  });

  return schema.validate(rental, { stripUnknown: true, abortEarly: true });
}

export default Rental;
