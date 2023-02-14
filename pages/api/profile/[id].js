import mongoDbConnect from "@/helpers/mongoDbConnect"
import postModel from "@/models/postModel"
import usersModel from "@/models/usersModel"
import Authenticated from "../authenticated"
mongoDbConnect()

export default async (req, res) => {
    switch (req.method) {
        case "GET":
             await fetchUser(req, res)
            break;

            case "PUT":
             await editUser(req, res)
            break;
    }
    
}


const fetchUser = Authenticated (async (req, res) => {
    const {id} = req.query
    const user = await usersModel.findOne({_id : id}).select("-password").populate("followers").populate("following")
    if(!user){
        res.status(404).json({error : "User Not Found"})
    }
    const post =  await postModel.find({postById : id}).populate("postById", "_id name")
    if(!post){
        res.status(404).json({error : "Post not found"})
    }
    res.status(200).json({user, post})
})


const editUser = Authenticated (async (req, res) => {
   try{
    const {ppic, userName} = req.body
    await usersModel.findOneAndUpdate({_id : req.userId}, {
        $set : {ppic, userName}
    })
    res.status(200).json({message : "User is UpDate"})
   }
   catch(error){
    console.log(error)
    console.log("User update error")
    process.exit(1)
   }
})