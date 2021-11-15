import Customer from "../models/customer";

export async function getAll() {
  return await Customer.find().sort("name");
}
export async function getById(id: string) {
  return await Customer.findById(id);
}
export async function create(params: any) {
  let customer = new Customer({
    name: params.name,
    phone: params.phone,
  });
  return await customer.save();
}
export async function update(id: string, params: any) {
  return Customer.findByIdAndUpdate(
    id,
    {
      name: params.name,
      phone: params.phone,
    },
    { new: true }
  );
}
export async function deleteById(id: string) {
  return await Customer.findByIdAndRemove(id);
}
