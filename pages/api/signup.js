import mongoDbConnect from '@/helpers/mongoDbConnect'
import usersModel from '@/models/usersModel'
import bycrpt from 'bcrypt'

mongoDbConnect()

export default async (req, res) => {
  try{
    const {name, email, password, ppic} = req.body
    if(!name || !email || !password){
     res.status(201).json({error : "Please full fil up!"})
    }
     const user = await usersModel.findOne({email})
     if(user){
         res.status(201).json({error : "Authentication Faild!"})
     }
     const hashPassword = await bycrpt.hash(password, 12)
     const newUser = new usersModel({
         name,
         email,
         password : hashPassword,
         ppic
     })
     await newUser.save()
     res.status(200).json({message : "Please Login"})
  }
  catch(error){
    console.log(error)
    console.log('Signup Error')
    process.exit(1)
  }
   
  
}