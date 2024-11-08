import mongoose from "mongoose"


const profileSchema = new mongoose.Schema({
    enrollmentNo:{
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
    sem:{
        type: Number,
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