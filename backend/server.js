const express = require("express");
const bodyParser = require("body-parser");
const {errorHandler} = require("./middleware/errorMiddleware");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.urlencoded({extended: true})); // Body parser to get data from frontend

app.use('/api/goals', require('./routes/goalRoutes'));

app.use(errorHandler);

app.listen(port, ()=>console.log(`Server running on port ${port}`));
