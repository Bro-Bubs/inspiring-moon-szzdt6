const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./routes/users");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(express.json());
var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(
  "mongodb+srv://BXF:BXF1234@cluster0.9ixm2dr.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const connection = mongoose.connection;

connection.on("error", (err) => console.log(err));

connection.on("connected", () =>
  console.log("Mongo DB Connection Successfull")
);

app.listen(3000, () => console.log("server run ...."));

app.post("/register/API", async function (req, res) {
  try {
    const newuser = new User(req.body);
    const resuft = await newuser.save();
    res.send(resuft);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get("/get-all", async function (req, res) {
  try {
    const newuser = await User.find();

    res.json(newuser);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.delete("/delete/:id", async function (req, res) {
  try {
    await User.findOneAndDelete({ id: req.body.transactionId });
    res.send("Transaction Updated Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});
