const { Playlist } = require("../models/playlist.model");
const { extend, concat, map } = require("lodash");
const { extractingPlaylistsVideosData } = require("../utils/playlist.utils");
const populateOptions = {
  path: "videos._id",
  select: "_id title description thumbnails",
};

const getPlaylists = async (req, res) => {
  try {
    const { user } = req;
    const playlists = await Playlist.find({ userId: user._id })
      .populate(populateOptions)
      .lean();
    if (!playlists) {
      throw ERROR("Something went worng");
    }
    const extaractedData = extractingPlaylistsVideosData(playlists);
    res.status(200).json({ data: extaractedData });
  } catch (err) {
    res.status(503).json({ error: "Something went worng" });
  }
};

const createPlaylist = async (req, res, next) => {
  try {
    const { user } = req;
    const { name } = req.body;
    if (!name) {
      throw ERROR();
    }
    let newPlaylist = new Playlist({ userId: user._id, name });
    newPlaylist = await newPlaylist.save();
    res.status(201).json({ data: newPlaylist, message: "Playlist Created" });
  } catch (err) {
    res.status(503).json({ error: "Something went worng" });
  }
};

const updatePlaylist = async (req, res) => {
  try {
    let { playlist } = req;
    const { description } = req.body;

    playlist = extend(playlist, { description });
    await playlist.save();
    res.status(200).json({ data: "playlist Description updated" });
  } catch (err) {
    res.status(503).json({ error: "Something went wrong." });
  }
};

const playlistVideoToogle = async (req, res) => {
  try {
    let { playlist, videoDetials } = req;
    const isAlreadyPresent = playlist.videos.id(videoDetials._id);
    let message = "";
    if (isAlreadyPresent) {
      playlist.videos.id(videoDetials.id).remove();
      message = "video Remove Successfully";
    } else {
      playlist.videos = concat(playlist.videos, [{ _id: videoDetials._id }]);
      message = "video Added Successfully";
    }
    await playlist.save();
    res.status(200).json({ data: message });
  } catch (err) {
    res.status(503).json({ error: "Something went wrong." });
  }
};

const deletePlaylist = async (req, res) => {
  try {
    const { playlist } = req;
    if (playlist.name === "My Playlist") {
      throw Error("You can't delete Default Playlist");
    }
    await Playlist.deleteOne({ _id: playlist._id });
    res.status(200).json({ data: "Playlist removed Successfully" });
  } catch (err) {
    res.status(503).json({ error: "Something went wrong." });
  }
};

const addNotes = async (req, res) => {
  try {
    let { playlist, videoDetials } = req;
    const { text, time } = req.body;
    if (playlist.videos.id(videoDetials._id)) {
      playlist.videos = map(playlist.videos, (video) => {
        return String(video._id) === String(videoDetials._id)
          ? {
              _id: videoDetials._id,
              notes: concat(video.notes, [{ text, time }]),
            }
          : video;
      });
    } else {
      playlist.videos = concat(playlist.videos, [
        { _id: videoDetials._id, notes: [{ text, time }] },
      ]);
      message = "video Added Successfully";
    }
    const updatedPlaylist = await playlist.save();
    const updatedNote = updatedPlaylist.videos
      .id(videoDetials._id)
      .notes.slice(-1);

    res.status(200).json({
      data: updatedNote[0],
    });
  } catch (err) {
    res.status(503).json({ error: "Something went wrong." });
  }
};

module.exports = {
  getPlaylists,
  createPlaylist,
  updatePlaylist,
  playlistVideoToogle,
  deletePlaylist,
  addNotes,
};
