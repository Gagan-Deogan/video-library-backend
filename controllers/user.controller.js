const { User } = require("../models/user.model")
const { Save } = require("../models/save.model")
const { Prefrence } = require("../models/prefrence.model")
const populateOptions = {
  path:'playlists.videos'
}


exports.userLogin = async(req, res)=>{
  try{
  const {email , password} = req.body;
  let user = await User.findOne({email:email, password:password},{password:0,__v:0});
  if(!user){
    res.status(200).json({ success:false, error:"Invalid email/password" })
  }else{
    user = await user.populate("savelist").populate("prefrence").execPopulate()
    res.status(200).json({success:true, data:user})
  }
  }catch(err){
    res.status(503).json({ success: false, error: err.message})
  }
}

exports.newUser = async(req, res)=>{
  try{
    let user = req.body;
    const save = await new Save().save();
    const prefrence = await new Prefrence().save();    
    user.playlists = [{name:"My Playlist"}]
    user.savelist = save._id
    user.prefrence = prefrence._id
    const NewUser = await new User(user).save();
    res.status(201).json({success:true, data:NewUser})
  }catch(err){
    res.status(503).json({ success: false, error: err.message})
  }
}