const mongoose = require("mongoose");


const UserSchema = mongoose.Schema({
  firstName: String,
  lastname: String,
  email: String,
  password: String,
  token: String,
});

const User = mongoose.model("user", UserSchema);
  
  module.exports = User;