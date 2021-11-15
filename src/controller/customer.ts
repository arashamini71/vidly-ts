import { validateCustomer } from "../models/customer";
import * as customerService from "../services/customer";
import { Request, Response } from "express";

export async function getAll(req: Request, res: Response) {
  const customers = await customerService.getAll();
  res.send(customers);
}
export async function getById(req: Request, res: Response) {
  const customer = await customerService.getById(req.params.id);
  if (!customer)
    return res.status(404).send("the customer with the given ID was not found");

  res.send(customer);
}
export async function create(req: Request, res: Response) {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = await customerService.create(req.body);
  customer = await customer.save();

  res.send(customer);
}
export async function update(req: Request, res: Response) {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = customerService.update(req.params.id, req.body);
  if (!customer)
    return res.status(404).send("the customer with the given ID was not found");

  res.send(customer);
}
export async function deleteById(req: Request, res: Response) {
  const customer = await customerService.deleteById(req.body.id);
  if (!customer)
    return res.status(404).send("the customer with the given ID was not found");

  res.send(customer);
}
