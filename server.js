require("dotenv").config();
const express = require("express");
const cors = require("cors"); 
const morgan = require("morgan");
const connectDB = require("./db/connect");
const { readdirSync } = require("fs");
const path = require("path");
const serverless = require("serverless-http");

const app = express();

connectDB();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));
app.options("*", cors());

readdirSync(path.join(__dirname, "routers")).map(file => {
  app.use("/api", require("./routers/" + file));
});

module.exports = serverless(app);
