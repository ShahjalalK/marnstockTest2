import mongoDbConnect from "@/helpers/mongoDbConnect"
import postModel from "@/models/postModel"
import Authenticated from "./authenticated"
mongoDbConnect()

export default Authenticated (async(req, res) => {
    const {postId} = req.body
   const post = await postModel.findByIdAndUpdate({_id : postId}, {
        $push : {
            likes : req.userId
        }
    }, {
        new : true
    }).populate("postById").populate("comments.postedBy")
    res.status(200).json(post)
})