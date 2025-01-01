import { File } from "../models/file.models.js";
import { Profile } from "../models/profile.models.js";
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"

export const clearAll = async(req,res)=>{
    try {
        const profileCollectionExists = await Profile.exists({});
        if (profileCollectionExists) {
            await Profile.collection.drop();  
          }
      
          const fileCollectionExists = await File.exists({});
          if (fileCollectionExists) {
            await File.collection.drop();    
          }
        
        res.status(200).json(new ApiResponse(200, "Cleared All"))
    } catch (error) {
        console.log(error)
        throw new ApiError(500,"Error")
    }
}