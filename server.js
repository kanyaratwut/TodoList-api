require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connect");
const { readdirSync } = require("fs");

const app = express();

connectDB();

app.use(express.json());

// app.get("/", (req, res) => {
//   console.log("Route / ถูกเรียก"); // <-- ต้องอยู่ใน callback function
//   res.send("Server running with MongoDB!");
// });

readdirSync("./routers").map((c) => {
  console.log(c);
  app.use("/api", require("./routers/" + c));
});

app.listen(5000, () => console.log("Server running on port 5000"));
