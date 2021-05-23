const express = require("express");
const router = express.Router();

const { getPlaylistById, getVideoById, getUserById } = require("../controllers/params.controller")
const { playlistVideoToogle, updatePlaylist, createPlaylist,getPlaylists, deletePlaylist } = require("../controllers/playlist.controller")
const { getPlaylistVideoToogleAction, extractingPlaylistsVideos } = require("../controllers/middlewares")

router.param("userId", getUserById )
router.get("/:userId", getPlaylists ,extractingPlaylistsVideos)
router.param("playlistId", getPlaylistById )
router.param("videoId", getVideoById )
router.post("/create/:userId", createPlaylist, extractingPlaylistsVideos )
router.post("/:userId/:playlistId/:videoId",getPlaylistVideoToogleAction, playlistVideoToogle, extractingPlaylistsVideos)
router.put("/:userId/:playlistId", updatePlaylist )
router.delete("/:userId/:playlistId", deletePlaylist )

module.exports = router