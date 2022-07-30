const express = require('express');
const { registerBilling } = require('../controllers/billings/registerBilling');
const { listBillings } = require('../controllers/billings/listBillings');
const authenticateAccess = require('../middlewares/authentication');
const verify = require('../middlewares/verify');
const { editBilling } = require('../controllers/billings/editBilling');
const { detailBilling } = require('../controllers/billings/detailBilling');
const { deleteBilling } = require('../controllers/billings/deleteBilling');

const routeBilling = express();

routeBilling.use(authenticateAccess);

routeBilling.post('/cobrancas/:id', verify.verifyFieldsBilling, registerBilling);
routeBilling.get('/cobrancas', listBillings);
routeBilling.put('/cobrancas/:id', verify.verifyFieldsBilling, editBilling);
routeBilling.get('/cobrancas/:id', detailBilling);
routeBilling.delete('/cobrancas/:id', deleteBilling);

module.exports = routeBilling;