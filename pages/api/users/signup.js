import userModel from "../../../models/userModel"
import bcrypt from 'bcrypt'
import mongoDbConnect from "@/helpers/mongoDbConnect"
import cartModel from "@/models/cartModel"

mongoDbConnect()

export default async (req, res) => { 
    const {name, email, password} = req.body
    if(!name || !email || !password){
        res.status(201).json({error : "Please full fill!"})
    }
    const user = await userModel.findOne({email})
    if(user){
        res.status(201).json({error : "This email and password exist!"})
    }else{
        const hashPassword = await bcrypt.hash(password, 12)
        const newUser = new userModel({
            name,
            email,
            password : hashPassword
        })
        const userCart = new cartModel({
            user : newUser._id
        })
        await newUser.save()
        await userCart.save()
        res.status(200).json({message: "Successfully Signup!"})
    }
    
    
}