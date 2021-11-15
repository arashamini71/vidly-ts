import Rental from "../models/rental";

export async function getAll() {
  return await Rental.find().sort("name");
}
export async function getById(id: string) {
  return await Rental.findById(id);
}
export async function getByCustomerIdAndMovieId(
  customerId: string,
  movieId: string
) {
  return await Rental.lookup(customerId, movieId);
}
export async function create(params: any, customer: any, movie: any) {
  let rental = new Rental({
    customer: customer,
    movie: movie,
    dateOut: params.dateOut,
    dateReturned: params.dateReturned,
    rentalFee: params.rentalFee,
  });
  return await rental.save();
}
export async function update(
  id: string,
  params: any,
  customer: any,
  movie: any
) {
  return Rental.findByIdAndUpdate(
    id,
    {
      customer: customer,
      movie: movie,
      dateOut: params.dateOut,
      dateReturned: params.dateReturned,
      rentalFee: params.rentalFee,
    },
    { new: true }
  );
}
export async function deleteById(id: string) {
  return await Rental.findByIdAndRemove(id);
}
