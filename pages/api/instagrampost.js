import mongoDbConnect from "@/helpers/mongoDbConnect";
import postModel from "@/models/postModel";
import usersModel from "@/models/usersModel";
import Authenticated from "./authenticated";

mongoDbConnect()



export default  async (req, res) => {
    switch (req.method) {
        case "POST":
            await savePost(req, res)
            break;                        
    }
    
}

const savePost = Authenticated (async (req, res) => {
    const {title, description, photo} = req.body
    if(!title || !description || !photo){
        res.status(201).json({error : "Please all filds!"})
    }
    const user = await usersModel.findOne({_id : req.userId})
    const newPost = new postModel({
        title,
        description,
        photo,
        postById : user._id
    })
    await newPost.save()
    res.status(200).json({message : "Successfully post save!"})
})





