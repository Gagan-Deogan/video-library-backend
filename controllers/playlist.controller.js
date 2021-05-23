const {extend, concat, remove, indexOf} = require('lodash');
const populateOptions = {
  path:'playlists.videos._id',
  select:"_id title description thumbnails"
}
exports.getPlaylists = async(req, res, next) =>{
  try{
    const { user } = req;
    const { playlists } = await user.populate(populateOptions).execPopulate()
    req.playlists = playlists
    next();
  }catch(err){
    res.status(503).json({ success: false, error: err.message})
  }
}


exports.createPlaylist = async( req, res , next) =>{
  try{
    const { user } = req;
    const { name } = req.body;

    user.playlists = concat(user.playlists, { name });
    await user.save();
    const { playlists } = await user.populate(populateOptions).execPopulate()
    req.playlists = playlists
    next()
  }catch(err){
    res.status(503).json({ success: false, error: err.message})
  }
}


exports.updatePlaylist = async(req, res ) => {
  try{
    let { user, playlist } = req
    const { description } = req.body;

    playlist = extend(playlist, { description });

    await user.save()
    
    res.status(200).json({success:true, data:"playlist Description updated" })
  }catch(err){
    res.status(503).json({ success: false, error: err.message})
  }
}


exports.playlistVideoToogle = async(req, res, next) =>{
  try{
    let {user, playlist, videoDetials, type } = req
    let updatedPlaylist = {}

    switch(type){
      case "ADD_TO_PLAYLIST":{
        playlist.videos = concat(playlist.videos, [{_id:videoDetials._id}])
        break;
      }
      case "REMOVE_FROM_PLAYLIST":{
        playlist.videos.id(videoDetials.id).remove()
        break;
      }
    }

    let updatedUser = await user.save();
    updatedUser = await updatedUser.populate(populateOptions).execPopulate()
    req.playlists = updatedUser.playlists;
    next();
  }catch(err){
    res.status(503).json({ success: false, error: err.message})
  }
}

exports.deletePlaylist = async(req, res )=>{
  try{
    let {user, playlist } = req;
    if(playlist.name === 'My Playlist'){
      throw Error("You can't delete Default Playlist")
    }
    await user.playlists.id(playlist._id).remove()
    await user.save();
    res.status(200).json({ success:true, data:"Playlist removed Successfully" })
  }catch(err){
    res.status(503).json({ success: false, error: err.message})
  }
}