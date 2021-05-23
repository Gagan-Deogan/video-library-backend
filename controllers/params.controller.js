const { Video } = require("../models/video.model")
const { Prefrence } = require("../models/prefrence.model")
const { User } = require("../models/user.model")
exports.getVideoById = async (req, res ,next , id) => {
  try{
    const videoDetials = await Video.findById(id);
    if(videoDetials){
      req.videoDetials = videoDetials
      next()
    }else{
      throw Error("No such Video found");
    }
  }catch(err){
    res.status(503).json({succes:false, error:err.message})
  }
}

exports.getPlaylistById = async (req, res ,next , id) => {
  try{
    const { user } = req
    const playlist = user.playlists.id(id);
    if(playlist){
      req.playlist = playlist
      next()
    }else{
      throw Error("No such playlist found");
    }
  }catch(err){
    res.status(503).json({succes:false, error:err.message})
  }
}

exports.getPrefrenceById = async(req, res, next, id) =>{
  try{
    const prefrence = await Prefrence.findById(id)
    if(prefrence){
      req.prefrence = prefrence
      next()
    }else{
      throw Error("No such prefrence found");
    }
  }catch(err){
    res.status(503).json({succes:false, error:err.message})
  }
}
exports.getUserById = async( req, res, next, id ) =>{
  try{
    const user = await User.findById(id)
    if(user){
      req.user = user
      next()
    }else{
      throw Error("Invaid user");
    }
  }catch(err){
    res.status(503).json({succes:false, error:err.message})
  }
}