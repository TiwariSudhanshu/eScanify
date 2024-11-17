import mongoose from "mongoose"


const profileSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        index: true
    },
    email:{
        type: String,
        required: true,
        index: true
    },
    branch:{
        type: String,
        index: true
    },
    eventName:{
        type: String,
        required: true,
        index: true
    },
    eventDate:{
        type: Date,
        required: true,
        index: true
    },
    year:{
        type: String,
        index: true
    },
    college:{
        type: String,
        index: true
    }
},{timestamps:true})

export const Profile = mongoose.model("Profile", profileSchema);