const { Video } = require("../models/video.model");
const { User } = require("../models/user.model");
const { Playlist } = require("../models/playlist.model");

const getVideoById = async (req, res, next, videoId) => {
  try {
    const videoDetials = await Video.findById(videoId);
    if (videoDetials) {
      req.videoDetials = videoDetials;
      next();
    } else {
      throw Error("No such Video found");
    }
  } catch (err) {
    res.status(503).json({ succes: false, error: err.message });
  }
};

const getPlaylistById = async (req, res, next, playlistId) => {
  try {
    const { user } = req;
    const playlist = await Playlist.findById(playlistId);
    if (playlist && String(playlist.userId) === String(user._id)) {
      req.playlist = playlist;
      next();
    } else {
      throw Error("No such playlist found");
    }
  } catch (err) {
    res.status(503).json({ succes: false, error: err.message });
  }
};

const getUserById = async (req, res, next, id) => {
  try {
    const user = await User.findById(id);
    if (user) {
      req.user = user;
      next();
    } else {
      throw Error("Invaid user");
    }
  } catch (err) {
    res.status(503).json({ succes: false, error: err.message });
  }
};
module.exports = {
  getVideoById,
  getPlaylistById,
  getUserById,
};
