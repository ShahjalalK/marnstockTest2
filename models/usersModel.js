import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true, 
        trim : true
    },
    email : {
        type : String,
        required : true, 
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    ppic :{
        type : String,        
        default : "user_1_e7n98o"
    },
    followers : [{type : mongoose.Types.ObjectId, ref : "User"}],
    following : [{type : mongoose.Types.ObjectId, ref : "User"}]
})

export default mongoose.models.User || mongoose.model('User', userSchema)