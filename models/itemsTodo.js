const mongoose = require("mongoose");
const category = require("./category");

module.exports = mongoose.model(
  "ItemsTodo",
  new mongoose.Schema(
    {
      id: String,
      name: String,
      description: String,
      date: String,
      status: Boolean,
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
      // createdAt: {
      //   type: Date,
      //   default: Date.now,
      // },
      // updatedAt: {
      //   type: Date,
      //   default: Date.now,
      // },
    },
    { timestamps: true }
  )
);
