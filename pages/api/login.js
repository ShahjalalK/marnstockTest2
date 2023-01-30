import mongoDbConnect from "@/helpers/mongoDbConnect"
import usersModel from "@/models/usersModel"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
mongoDbConnect()
export default async(req, res) => {
    const {email, password} = req.body
    if(!email || !password){
        res.status(201).json({error : "Please Full fill up!"})
    }
    const user = await usersModel.findOne({email})
    if(!user){
        res.status(201).json({error : "Authentication Faild!"})
    }
    const matchPassowrd = await bcrypt.compare(password, user.password)
    if(matchPassowrd){
        const token = jwt.sign({userId : user._id}, process.env.TOKEN_SECRET_KEY, {
            expiresIn: '1h'           
        })
        res.status(200).json({token})
    }
}