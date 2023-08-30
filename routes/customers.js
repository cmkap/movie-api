const express = require("express");
const router = express.Router();

const { Customer, schema } = require("../model/customer");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find({});
    res.send(customers);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

router.post("/", auth, async (req, res) => {
  const { value, error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.message);
  let customer = new Customer({ ...value });
  try {
    customer = await customer.save();
    res.status(201).send(customer);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

router.put("/:id", auth, async (req, res) => {
  const { value, error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.message);
  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { ...value },
      { new: true }
    );
    if (!customer) return res.status(404).send("Customer not found");
    res.send(customer);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer) return res.status(404).send("Customer not found");

    return res.status(200).send(customer);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(_id);
    if (!customer)
      return res
        .status(404)
        .send("The customer with the given ID was not found.");
    return res.status(200).send(customer);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
