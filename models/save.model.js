const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoIdSchema = new Schema({
  video:{
    type:Schema.ObjectId,
    ref:"video",
    required:"video required",
    unique: true,
  }
}) 

const saveSchema = new Schema({
  videos:[videoIdSchema]
})

const Save = mongoose.model("save", saveSchema);

module.exports = { Save };