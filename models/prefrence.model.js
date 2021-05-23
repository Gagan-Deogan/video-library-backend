const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feedback = new Schema({
  video:{
    type:Schema.ObjectId,
    ref:"video",
    required:"video required",
    unique: true,
  },
  feels:{
    type:String,
    required:"user feel required",
  }
}) 

const prefrenceSchema = new Schema({
  feedbacks:{
    type:[feedback],
  }
});

const Prefrence = mongoose.model("prefrence",prefrenceSchema);

module.exports = { Prefrence }

