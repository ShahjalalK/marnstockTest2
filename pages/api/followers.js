import mongoDbConnect from "@/helpers/mongoDbConnect"
import usersModel from "@/models/usersModel"
import Authenticated from "./authenticated"
mongoDbConnect()

export default Authenticated (async (req, res) => {
    const {followId} = req.body
    const follow = await usersModel.findByIdAndUpdate({_id : followId}, {
        $push : {followers : req.userId}
    }, {new : true}).populate("followers")
    if(!follow){
        res.status(201).json({error : "Please Login"})
    }
   const following = await usersModel.findByIdAndUpdate({_id : req.userId}, {
        $push : {following : followId}
    }, {new : true}).populate("following")
    res.status(200).json(follow, following)
})