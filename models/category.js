const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Category",
  new mongoose.Schema({
    id: String,
    name: String,
    color: String,
    background: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  })
);
