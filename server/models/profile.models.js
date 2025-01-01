import mongoose from "mongoose"


const profileSchema = new mongoose.Schema({
    name:{
        type: String,
        index: true,
        required: true
    },
    email:{
        type: String,
        index: true,
        required: true
    },
    eventName:{
        type: String,
        index: true
    },
    eventDate:{
        type: Date,
        index: true
    },
    certificate:{
        type: mongoose.Types.ObjectId,
        ref: 'File'
    }
},{timestamps:true})

export const Profile = mongoose.model("Profile", profileSchema);