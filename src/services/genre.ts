import Genre from "../models/genre";

export async function getAll() {
  return await Genre.find().sort("name");
}
export async function getById(id: string) {
  return await Genre.findById(id);
}
export async function create(params: any) {
  let genre = new Genre({
    name: params.name,
  });
  return await genre.save();
}
export async function update(id: string, params: any) {
  return Genre.findByIdAndUpdate(
    id,
    {
      name: params.name,
    },
    { new: true }
  );
}
export async function deleteById(id: string) {
  return await Genre.findByIdAndRemove(id);
}
