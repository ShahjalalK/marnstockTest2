import usersModel from "@/models/usersModel"
import bycrpt from 'bcrypt'

export default async (req, res) => {
   const {name, email, password} = req.body
   if(!name || !email || !password){
    res.status(201).json({error : "Please full fil up!"})
   }else{
    const user = await usersModel.findOne({email})
    if(user){
        res.status(201).json({error : "Authentication Faild!"})
    }
    const hashPassword = await bycrpt.hash(password, 12)
    const newUser = new usersModel({
        name,
        email,
        password : hashPassword
    })
    await newUser.save()
    res.status(200).json({message : "User Successfully Save"})
   
   }
}