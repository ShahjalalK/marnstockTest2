import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim : true
    },
    description : {
        type : String,
        required : true,
        trim : true
    },
    likes : [{
        type : mongoose.Types.ObjectId,
        ref : 'User'
    }],
    comments : [{
            text : String,
            postedBy : {type : mongoose.Types.ObjectId, ref : 'User'}
    }],
    photo : {
        type : String
    },
    postById : {
        type : mongoose.Types.ObjectId,
        ref : 'User'
    }
})

export default mongoose.models.Post || mongoose.model("Post", postSchema)