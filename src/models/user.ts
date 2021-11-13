import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import joi, { boolean, ValidationResult } from "joi";

interface IUserInput {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}
export interface IUser extends IUserInput, Document {
  comparePassword(password: string): Promise<boolean>;
  hashPassword(): Promise<void>;
  generateAuthToken(): string;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});

UserSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.hashPassword = async function () {
  this.password = await bcrypt.hash(this.password, 10);
};

UserSchema.methods.generateAuthToken = function (): string {
  const JWT_SECRET = process.env.JWT_SECRET ?? "JWT_SECRET";
  const token = jwt.sign(
    { sub: this._id, name: this.name, isAdmin: this.isAdmin },
    JWT_SECRET
  );
  return token;
};

export function validateUser(user: IUserInput): ValidationResult {
  const schema = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required(),
  });
  return schema.validate(user, { stripUnknown: true, abortEarly: true });
}

const User = mongoose.model<IUser>("user", UserSchema);

export default User;
