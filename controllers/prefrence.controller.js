const { Prefrence } = require("../models/prefrence.model")
const {extend, concat } = require("lodash")

const populateOptions = {
  path:'feedbacks.video',
  select:"_id title description thumbnails"
}

exports.updateUserPrefrence =  async(req, res) =>{
  let { videoDetials, prefrence, feedback, type } = req;
  const { feels } = req.body
  let updatedPrefrence = {}
  try{
    switch(type){
      case "TOOGLE_FEELS":
        const updatedfeedback = extend(feedback,{ feels } )
        prefrence.feedbacks = extend(prefrence.feedbacks, {updatedfeedback})
        break;
      case "NEW_FEEL":
        prefrence.feedbacks = concat(prefrence.feedbacks,[{_id:videoDetials._id, video:videoDetials._id, feels }] )
        break;
      case "REMOVE_FEEL":
        await prefrence.feedbacks.id(videoDetials._id).remove();
        break;
      default:
        throw Error("type no match")
    }
    updatedPrefrence = await prefrence.save() 
    updatedPrefrence = await updatedPrefrence.populate(populateOptions).execPopulate()
    res.status(200).json({ success:true, data: updatedPrefrence })
  }catch(err){
    res.status(503).json({ success: false, error: err.message})
  }
}