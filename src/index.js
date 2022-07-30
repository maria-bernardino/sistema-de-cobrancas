require('dotenv').config();
const express = require('express');
const app = express();
const routeUser = require('./routes/user');
const routeLogin = require('./routes/login');
const routeCostumer = require('./routes/customer');
const cors = require('cors');
const routeBilling = require('./routes/billings');
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(routeLogin);
app.use(routeUser);
app.use(routeCostumer);
app.use(routeBilling);

app.listen(port, () => {
    console.log(`Server is Runnig at http://localhost:8000/`);
});