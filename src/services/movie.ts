import Movie from "../models/movie";

export async function getAll() {
  return await Movie.find().sort("name");
}
export async function getById(id: string) {
  return await Movie.findById(id);
}
export async function create(params: any, genre: any) {
  let movie = new Movie({
    title: params.title,
    genre: genre,
    dailyRentalRate: params.dailyRentalRate,
    numberInStock: params.numberInStock,
  });
  return await movie.save();
}
export async function update(id: string, params: any, genre: any) {
  return Movie.findByIdAndUpdate(
    id,
    {
      title: params.title,
      genre: genre,
      dailyRentalRate: params.dailyRentalRate,
      numberInStock: params.numberInStock,
    },
    { new: true }
  );
}
export async function incNumberInStock(id: string) {
  return Movie.updateOne({ _id: id }, { $inc: { numberInStock: 1 } });
}
export async function deleteById(id: string) {
  return await Movie.findByIdAndRemove(id);
}
