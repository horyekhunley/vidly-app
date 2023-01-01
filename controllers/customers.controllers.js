const {Customer, validateCustomer} = require('../models/customers.models')

exports.getAllCustomers = async (req, res) => {
	const customers = await Customer.find().sort('name')
	return res.status(200).json(customers)
}
exports.createCustomer = async (req, res) => {
	const { error } = validateCustomer(req.body)
	if (error) return res.status(400).send(error.details[0].message)

	let customer = new Customer({
		name: req.body.name,
		phone: req.body.phone,
		isGold: req.body.isGold
	})
	customer = await customer.save()
	res.status(201).json(customer)
}
exports.updateCustomer = async (req, res) => {
	const { error } = validateCustomer(req.body)
	if (error) return res.status(400).send(error.details[0].message)

	const customer = await Customer.findByIdAndUpdate(req.params.id, {...req.body}, {
		new: true
	})
	if (!customer) return res.status(404).send('The customer with the given id does not exist')

	res.status(200).json({
		message: 'Customer updated successfully',
		customer
	})}
exports.deleteCustomer = async (req, res) => {
	const customer = await Customer.findByIdAndRemove(req.params.id)
	if (!customer) return res.status(404).send('The customer with the given id does not exist')
	res.status(200).json({
		message: 'Customer deleted successfully',
		customer
	})
}
exports.getCustomerById = async (req, res) => {
	const customer = await Customer.findById(req.params.id)
	if (!customer) return res.status(404).send('The customer with the given id does not exist')
	return res.status(200).json(customer)
}