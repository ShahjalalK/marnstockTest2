import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    body : {
        type : String,
        required : true
    },
    photo : {
        type : String,
        required : true,
        default : 'no photo'
    },
    postedBy : {
        type : mongoose.Types.ObjectId,
        ref : 'User'
    }
})

export default mongoose.models.UserPost || mongoose.model('UserPost', postSchema)