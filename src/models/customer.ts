import joi, { ValidationResult } from "joi";
import mongoose, { Document, Schema } from "mongoose";

interface ICustomerInput {
  name: string;
  isGold: Boolean;
  phone: string;
}

export interface ICustomer extends ICustomerInput, Document {}

const customerSchema = new Schema({
  name: { type: String, required: true },
  isGold: { type: Boolean, default: false },
  phone: { type: String, required: true },
});

const Customer = mongoose.model<ICustomer>("customer", customerSchema);

export function validateCustomer(customer: ICustomerInput): ValidationResult {
  const schema = joi.object({
    name: joi.string().required(),
    phone: joi.string().required(),
  });
  return schema.validate(customer, { abortEarly: true, stripUnknown: true });
}

export default Customer;
