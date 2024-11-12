import mongoose from "mongoose"


const profileSchema = new mongoose.Schema({
    enrollment:{
        type: String,
        required: true,
        index: true
    },
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
        required: true,
        index: true
    },
    eventName:{
        type: String,
        required: true,
        index: true
    },
    mobile:{
        type: String,
        required: true,
        index: true
    },
    year:{
        type: String,
        required: true,
        index: true
    },
    college:{
        type: String,
        required: true,
        index: true
    }
},{timestamps:true})

export const Profile = mongoose.model("Profile", profileSchema);