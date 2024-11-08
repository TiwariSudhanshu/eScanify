import { Profile } from "../models/profile.models.js";
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"

export const saveData = async(req, res)=>{
    
   try {
    console.log(req.body)
     const { enrollmentNo, name, email, sem, branch, college} = req.body;
 
     const existedProfile = await Profile.findOne({enrollmentNo})
 
     if(existedProfile){
         throw new ApiError(400, "Profile with this enrollment no already exist")
     }
 
     const  profile = await Profile.create({
         enrollmentNo,
         name,
         email,
         branch,
         sem,
         college
     })
 
     const createdProfile = await Profile.findById(profile._id)
 
     if(!createdProfile){
         throw new ApiError(500, "Internal server error in saving data")
     }
 
 
     return res.status(200).json(
         new ApiResponse(200, createdProfile, "Profile saved in database")
     )
   } catch (error) {
        console.log("Error : ",error)
    
   }
}