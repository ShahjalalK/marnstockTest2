import mongoDbConnect from "@/helpers/mongoDbConnect"
import userModel from "@/models/userModel"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
mongoDbConnect()

export default async (req, res) => {
    const {email, password} = req.body
    if(!email || !password){
        res.status(201).json({error : 'Authintecation Error'})
    }
    const user = await userModel.findOne({email})
    if(!user){
        res.status(201).json({error : 'Authintecation Error'})
    }
    const match = await bcrypt.compare(password, user.password)
    if(match){
        const token = jwt.sign({userId : user._id}, process.env.TOKEN_SECRET_KEY, {
            expiresIn : '1h'
        })
        const {name, role, email} = user
        res.status(200).json({token, user : {name, role, email}})
    }else{
        res.status(201).json({error : 'Authintecation Error'}) 
    }
}