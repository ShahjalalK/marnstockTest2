import mongoDbConnect from "@/helpers/mongoDbConnect"
import postModel from "@/models/postModel"
import Authenticated from "./authenticated"
mongoDbConnect()

export default Authenticated (async(req, res) => {
    const {postId, text} = req.body  
    if(!postId){
        res.status(201).json({error : 'PostId not Found'})
    } 
    if(!text){
        res.status(201).json({error : 'text not Found'})
    }else{

        const comment = {text, postedBy : req.userId}
  const post = await postModel.findByIdAndUpdate({_id : postId}, {
        $push : {
            comments : comment
        }
    }, {
        new : true
    }).populate("postById").populate("comments.postedBy")
    res.status(200).json( post)

    }
    res.status(201).json({error : 'text not Found'})
    
    
})