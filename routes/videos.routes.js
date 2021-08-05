const express = require("express");
const router = express.Router();
const {
  getAllVideos,
  addVideo,
  sendVideoDetails,
} = require("../controllers/video.controller");
const { authenticate } = require("../config/passport");
const { getVideoById } = require("../controllers/params.controller");
router.get("/", getAllVideos);
router.post("/", addVideo);
router.use(authenticate);
router.param("videoId", getVideoById);
router.get("/:videoId", sendVideoDetails);

module.exports = router;
