import express from "express";
import auth from "../middlewares/auth";
import Customer, { validateCustomer } from "../models/customer";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const customers = await Customer.find().sort("name");
  return res.send(customers);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
  });
  await customer.save();

  return res.send(customer);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      phone: req.body.phone,
    },
    { new: true }
  );

  if (!customer)
    res.status(404).send("the customer with the given ID was not found");

  return res.send(customer);
});

router.delete("/:id", auth, async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer)
    res.status(404).send("the customer with the given ID was not found");

  return res.send(customer);
});

router.get("/:id", auth, async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer)
    res.status(404).send("the customer with the given ID was not found");

  return res.send(customer);
});

export default router;
