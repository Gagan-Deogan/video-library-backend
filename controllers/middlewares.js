exports.getPlaylistVideoToogleAction = async( req, res, next) =>{
  const { user, playlist, videoDetials } = req
  try{
    const isAlreadyPresent  = await playlist.videos.id(videoDetials._id)
    if(!isAlreadyPresent){
      req.type = "ADD_TO_PLAYLIST"
    }else{
      req.type = "REMOVE_FROM_PLAYLIST"
    }
    next();
  }catch(err){
    res.status(503).json({succes:false, error:err.message})
  }
}

exports.getActionType = async(req, res, next) =>{
  const { prefrence, videoDetials,  } = req 
  const { feels } = req.body
  try{
    const feedback = await prefrence.feedbacks.id(videoDetials._id);  
    if( feedback && feedback.feels == feels ){
      throw Error(`Video is already ${feels}`)
    }
    req.feedback = feedback;
    if( feedback && feels !=="REMOVE" && (feels === "LIKE" || feels === "DISLIKE") ){
      req.type="TOOGLE_FEELS"
      next();
    }else if( feedback && feels ==="REMOVE" ){
      req.type="REMOVE_FEEL"
      next();
    }else if( !!!feedback && feels !=="remove" && (feels === "LIKE" || feels === "DISLIKE") ){
      req.type="NEW_FEEL"
      next();
    }else{
       throw Error("worng request")
    }
  }catch(err){
    res.status(503).json({succes:false, error:err.message})
  }
}


exports.extractingPlaylistsVideos = (req, res) =>{
  let { playlists } = req;
  playlists = playlists.toObject();
  const playlistsData = playlists.map((playlist)=>{
    return { ...playlist, videos:playlist.videos.map(video=> video._id)}
  })
  res.status(200).json({success:true, data:playlistsData })
}