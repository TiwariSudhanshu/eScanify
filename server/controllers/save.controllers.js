import { Profile } from "../models/profile.models.js";
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"

export const saveData = async(req, res)=>{
    
   try {
     const { name, eventName, eventDate, email, year, branch, college} = req.body;

 
     const  profile = await Profile.create({
         name,
         email,
         eventName,
         eventDate,
         branch,
         year,
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