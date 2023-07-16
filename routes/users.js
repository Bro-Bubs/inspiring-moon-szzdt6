const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  type: { type: String, required: true },
  category: { type: String, required: true },
  reference: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
});

const usermodel = mongoose.model("Users", userSchema);

module.exports = usermodel;
