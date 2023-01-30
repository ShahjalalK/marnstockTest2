import userModel from "@/models/userModel"
import Aunticated from "./aunticated"
export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await fetchUsers(req, res)
            break;
        case "PUT":
            await changeRole(req, res)
            break;
    }
}


const fetchUsers = Aunticated (async(req, res) => {
    const user = await userModel.find({_id : {$ne : req.userId}})
    res.status(200).json(user)
})

const changeRole = Aunticated (async(req, res) => {
    const {_id, role} = req.body
    const newRole = role === 'user' ? 'admin' : 'user'
   const user = await userModel.findByIdAndUpdate({_id}, {
        role : newRole
    }, {
        new : true
    })
    res.status(200).json(user)
})