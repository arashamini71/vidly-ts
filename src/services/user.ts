import User from "../models/user";

export async function getById(id: string) {
  return await User.findById(id);
}

export async function getByEmail(email: string) {
  return await User.findOne({ email: email });
}

export async function create(params: any) {
  const user = new User({
    name: params.name,
    email: params.email,
    password: params.password,
  });
  await user.hashPassword();
  await user.save();
  return user;
}
