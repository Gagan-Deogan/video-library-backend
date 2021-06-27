const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notesSchema = new Schema({
  text: {
    type: String,
    required: "Text Required",
  },
  time: {
    type: String,
    required: "Text Required",
  },
});

const videoIdSchema = new Schema({
  _id: {
    type: Schema.ObjectId,
    ref: "video",
  },
  notes: [notesSchema],
});

const playlistSchema = Schema({
  userId: {
    type: Schema.ObjectId,
    ref: "User",
    required: "UserId Required",
  },
  name: {
    type: String,
    required: "Playlist name required",
  },
  description: {
    type: String,
    max: [500, "Description exceed the max lenght"],
  },
  videos: [videoIdSchema],
});

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = { Playlist };
