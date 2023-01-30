import mongoose from "mongoose"

const userSchema = mongoose.Schema({
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
        required : true,
    },
    role : {
        type : String,
        required : true,
        default : 'user',
        enum : ['root', 'admin', 'user']
    }
},{
    timestamps : true
})

export default mongoose.models.User || mongoose.model('User', userSchema)