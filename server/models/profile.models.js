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
},{timestamps:true})

export const Profile = mongoose.model("Profile", profileSchema);