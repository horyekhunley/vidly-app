const express = require("express");
const { Customer, validate } = require("../models/customer_model");
const router = express.Router();

router.get("/", async (req, res) => {
	const customers = await Customer.find().sort("name");
	res.send(customers);
});
router.post("/", async(req, res) => {
	//first validate request
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let customer = new Customer({ ...req.body });
	customer = await customer.save();

	res.send(customer);
});

router.put("/:id", async (req, res) => {
	//first validate request
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const customer = await Customer.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })

	if (!customer)
		return res.status(404).send("The customer with the given id was not found");

    res.send(customer)
});
router.delete("/:id", async (req, res) => {
	//first validate request
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const customer = await Customer.findByIdAndRemove(req.params.id,);

	if (!customer)
		return res.status(404).send("The customer with the given id was not found");

    res.send(customer)
});
router.get("/:id", async (req, res) => {
	//first validate request
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const customer = await Customer.findById(req.params.id,);

	if (!customer)
		return res.status(404).send("The customer with the given id was not found");

    res.send(customer)
})

module.exports = router