import mongoDbConnect from "@/helpers/mongoDbConnect"
import postModel from "@/models/postModel"

mongoDbConnect()

export default async (req, res) => {
    const allPost = await postModel.find().populate("postById").populate("comments.postedBy")
    res.status(200).json(allPost)
}