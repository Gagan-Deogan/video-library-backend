const express = require("express")
const router = express.Router();
const {getUserPrefrences, getPrefrenceType,updateUserPrefrence} = require("../controllers/prefrence.controller")
const {getVideoById, getPrefrenceById} = require("../controllers/params.controller")
const { getActionType } = require("../controllers/middlewares")

router.param("prefrenceId", getPrefrenceById)
router.param("videoId", getVideoById)
router.post("/:prefrenceId/:videoId", getActionType, updateUserPrefrence);


module.exports = router