const express = require('express');
const { detailCustomer } = require('../controllers/customers/detailCustomer');
const { editCustomer } = require('../controllers/customers/editCustomer');
const { listCustomers } = require('../controllers/customers/listCustomers');
const { registerCustomer } = require('../controllers/customers/registerCustomer');
const authenticateAccess = require('../middlewares/authentication');
const verify = require('../middlewares/verify');

const routeCostumer = express();

routeCostumer.use(authenticateAccess);

routeCostumer.post('/cliente', verify.verifyFieldsCustomer, registerCustomer);
routeCostumer.get('/cliente', listCustomers);
routeCostumer.get('/cliente/:id', detailCustomer);
routeCostumer.put('/cliente/:id',verify.verifyFieldsCustomer, verify.verifyCpfCustomerEdit,verify.verifyEmailCustomerEdit, editCustomer)


module.exports = routeCostumer;
