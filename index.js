require("dotenv").config();
require("./config/dbconnection");

const express = require("express");
const app = express();
const routes = require("./routes");

// middelware
app.use(express.json());

// router
app.use("/", routes);

const port = process.env.APP_PORT || 3000;
app.listen(port, () => console.log(`App running on port ${port}`));
