const express = require("express");

const app = express();
const mongoose = require("mongoose");
//pipeline and middleware
app.use(express.json());

mongoose
  .connect("mongodb://localhost/contact")
  .then(() => console.log("connect to database"))
  .catch((err) => console.log("exception occured", err));

const UserSchema = mongoose.Schema({
  user: String,
  password: String
});

const EnquarySchema = mongoose.Schema({
  date: String,
  enquaries: Number
});

const ContactSchema = mongoose.Schema({
  FirstName: String,
  Lastname: String,
  Email: String,
  Message: String,
  Date: String
});

const Contact = mongoose.model("contact", ContactSchema);

const User = mongoose.model("user", UserSchema);

const Enquary = mongoose.model("enquarie", EnquarySchema);

//  Contact.ensureIndexes({"Date": 1});

app.get("/user", (req, res) => {
  User.find().then((user) => res.send(user));
  return;
});

app.get("/enquary", (req, res) => {
  Enquary.find().then((user) => res.send(user));
  return;
});

app.get("/contact_us", (req, res) => {
  Contact.find().then((mentor) => res.send(mentor));
  return;
});

app.get("/:Date", (req, res) => {
  Contact.find({ Date: req.params.Date }).then((data) => res.send(data));
  return;
});

app.post("/contact_us", (req, res) => {
  const user = new Contact({
    FirstName: req.body.FirstName,
    Lastname: req.body.LastName,
    Email: req.body.Email,
    Message: req.body.Message,
    Date: `${new Date().getDate()}`
  });

  user.save().then((data) => res.send(data));
  return;
});

app.listen(3000, () => {
  console.log("listening");
});
