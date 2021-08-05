const { Playlist } = require("../models/playlist.model");

const getUserNotesPlaylist = async (req, res, next) => {
  try {
    const { user } = req;
    const playlist = await Playlist.findOne({
      userId: user._id,
      name: "My Notes",
    });
    if (!playlist) {
      throw ERROR("no playlist Found");
    }
    req.playlist = playlist;
    next();
  } catch (err) {
    res.status(503).json({ succes: false, error: "Something went worng" });
  }
};

module.exports = {
  getUserNotesPlaylist,
};
