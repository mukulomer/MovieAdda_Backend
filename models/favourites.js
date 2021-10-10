const mongoose = require("mongoose");
const Schema = mongoose.Schema;


let favourites = new Schema(
    {
      name: { type: String, trim: true },
      title: { type: String, trim: true },
      poster_path: { type: String, trim: true },
      overview: { type: String, trim: true },
      vote_average: { type: String }
    },
    { timestamps: true }
  )
  
  module.exports = mongoose.model('Movie', favourites)