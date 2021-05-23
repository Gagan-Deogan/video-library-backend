const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const videoIdSchema = new Schema({
  _id:{
    type:Schema.ObjectId,
    ref:"video",
    unique: true,
  }
});

const playlist = new Schema({
  name:{
    type:String,
    required:"Playlist name required"
  },
  description:{
    type:String,
    max:[500, "Description exceed the max lenght"]
  },
  videos:{
    type:[videoIdSchema],
  }
})

const UserSchema = new Schema({
  name:{
    type:String,
    required:"Name must Required"
  },
  email:{
    type:String,
    required:"Name must Required",
    unique:[true,"email is alreay used"],
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password:{
    type:String,
    required:"password Required",
  },
  image:{
    type:String,
  },
  playlists:[playlist],
  savelist:{
    type:Schema.ObjectId,
    ref:"save",
    unique:"save list must be unique.",
    required:"savelist list Required",
  },
  prefrence:{
    type:Schema.ObjectId,
    ref:"prefrence",
    unique:"prefrence list must be unique.",
    required:"prefrence list Required",
  }
}) 

const User = mongoose.model("User", UserSchema);
module.exports = { User }