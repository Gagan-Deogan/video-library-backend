const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VidoeSchema = new Schema({
  ytId:{
    type:String,
    required:"Video ID Required",
    unique:"This Video is already Exists"
  },
  title:{
    type:String,
    required:"Video Title Required"
  },
  description:{
    type:String,
    required:"Video Title Required"
  },
  thumbnails:{
    type:String,
    required:"Video Title Required"
  },
  likes:{
    type:Number,
    required:"Likes number Required"
  },
  dislikes:{
    type:Number,
    required:"Dislikes number required"
  },
  views:{
    type:Number,
    required:"Dislikes number required"
  },
  publishedAt:{
    type:String,
    required:"PublishedAt field required"
  }
});

const Video = mongoose.model("video",VidoeSchema);

module.exports = { Video }