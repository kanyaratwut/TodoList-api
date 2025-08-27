require("dotenv").config();
const express = require("express");
const cors = require("cors"); 
const morgan = require("morgan");
const connectDB = require("./db/connect");
const { readdirSync } = require("fs");

const app = express();

connectDB();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

readdirSync("./routers").map((c) => {
  console.log(c);
  app.use("/api", require("./routers/" + c));
});

app.listen(5000, () => console.log("Server running on port 5000"));
