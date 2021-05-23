const {Video} = require("../models/video.model")

module.exports.getAllVideos = async (req, res) =>{
  try{
    const video = await Video.find({})
    res.status(200).json({ success:true, data:video })
  }catch(err){
    res.status(503).json({success:false, error:err.message})
  }
}

module.exports.addVideo = async (req, res) =>{
  try{
    const video = req.body
    const newVideo = new Video(video);
    const savedVideo = await newVideo.save();
    res.status(200).json({ success:true, data:savedVideo })
  }catch(err){
    res.status(503).json({ success:false, error:err.message })
  }
}

module.exports.sendVideoDetails = async(req, res) =>{
  try{
    const videoDetials = req.videoDetials
    res.status(200).json({ success:true, data:videoDetials })
  }catch(err){
    res.status(503).json({success:false, error:err.message})
  }
}