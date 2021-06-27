const express = require("express");
const router = express.Router();
const { authenticate } = require("../config/passport");

const {
  getPlaylistById,
  getVideoById,
  getUserById,
} = require("../controllers/params.controller");
const {
  playlistVideoToogle,
  updatePlaylist,
  createPlaylist,
  getPlaylists,
  deletePlaylist,
  addNotes,
} = require("../controllers/playlist.controller");
const {
  getPlaylistVideoToogleAction,
  getUserNotesPlaylist,
} = require("../controllers/middlewares");

router.use(authenticate);
router.get("/", getPlaylists);
router.param("videoId", getVideoById);
router.param("playlistId", getPlaylistById);
router.post("/create", createPlaylist);
router.post("/add-note/:videoId", getUserNotesPlaylist, addNotes);
router.post("/:playlistId/:videoId", playlistVideoToogle);
router.put("/:playlistId", updatePlaylist);
router.delete("/:playlistId", deletePlaylist);

module.exports = router;
