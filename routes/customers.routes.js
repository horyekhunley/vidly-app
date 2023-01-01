const express = require('express')
const auth = require('../middleware/auth.middleware')
const { getAllCustomers, createCustomer, getCustomerById, updateCustomer, deleteCustomer } = require("../controllers/customers.controllers");
const router = express.Router()

router.route('/').get(getAllCustomers).post(auth, createCustomer)

router.route('/:id').get(auth, getCustomerById).put(auth, updateCustomer).delete(auth, deleteCustomer)

module.exports = router