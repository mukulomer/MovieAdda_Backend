const express = require("express");
const app = express();
require('dotenv')
var cors = require("cors");
const mongoose = require("mongoose");
const User = require('./models/users')
const Favourites = require('./models/favourites')
const config = require('./config/config')
//pipeline and middleware
const router = express.Router();
const Auth = require('./middleware/auth')
const Token = require('./service/token')
app.use(express.json());
const dbUrl = "mongodb+srv://mukulOmer:9044%40Mukul@cluster0.a4izb.mongodb.net/CapitalSetu?retryWrites=true&w=majority";
mongoose
  .connect(dbUrl)
  .then(() => console.log("connect to database"))
  .catch((err) => console.log("exception occured", err));
  

app.use(cors());

router.use(Auth)

app.get("/api/user", (req, res) => {
  User.find().then((user) => res.send(user))
  .catch((err) => console.log("exception occured", err));
  return;
});

app.get("/api/get_favourites", async(req, res) => {
try{
  let favourites = await Favourites.find({})
  if(!favourites[0])
  {
  return res.send({
    status : false,
    data : [],
    message: 'data not found'
  });
  }

  return res.send({
    status : true,
    data : favourites,
    message: 'success'
  });
 
  }
  catch(error)
  {
    console.log(error);
  }
});

app.post("/api/sign_in", async (req, res) => {
  try{
  const {email,password} = req.body
  let user = await User.findOne({email,password})
  if(!user)
  return res.send({
    status: false,
    message : 'email or password is wrong please try again'
  });

  let token = Token.generateToken(user._id);
  user.token = token;
  await user.save();
   
  res.send({
    status : true,
    data : user,
    message: 'success'
  });
  return;
  }
  catch(error)
  {
    console.log(error);
  }
});


app.post("/api/sign_up", async (req, res) => {
  try {
  const {email,firstName,lastName,password} = req.body;
  if(!email || !firstName,!lastName,!password)
  {
    return res.send({
      status: false,
      data: '',
      message: 'all fields are mandatory'
    }) 
  }
  let user = await User.findOne({email})
  if(user)
  {
    return res.send({
    status: false,
    data: '',
    message: 'user is already exist'
  })
}

  user = new User({email,firstName,lastName,password});
  
  let token = Token.generateToken(user._id);
  user.token = token;
  await user.save();
  return res.send({
    status: true,
    data : user,
    message: 'success'
  });
  }
  catch(error)
  {
    console.log(error);
  }
});

app.post('/api/add_favourites', async (req,res) => {
try{
  const {name,title,overview,vote_average,poster_path} = req.body;
  const movies = await new Favourites({name,title,overview,vote_average,poster_path}).save();
  
  return res.send({
    status: true,
    data : movies,
    message: 'success'
  });
  }
  catch(error)
  {
    console.log(error);
  }
});

app.listen( process.env.PORT, () => {
  console.log("listening");
});