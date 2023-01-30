import postModel from "@/models/postModel"
import Authenticated from "./authenticated"
export default Authenticated (async (req, res) => {
    const {title, body, photo, postedBy} = req.body
    if(!title || !body){
        res.status(201).json({error : "Please all fields!"})
    }
    const newPost = await postModel({
        title,
        body,
        photo,
        postedBy : req.userId
    })
    await newPost.save()
    res.status(200).json({message : "Success fully save"})
})