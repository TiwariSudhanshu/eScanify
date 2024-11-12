import { Profile } from "../models/profile.models.js";
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"


export const fetchData = async ( req, res )=>{
    const { id } = req.body;
    const profile = await Profile.findById(id)

    if(!profile){
        throw ApiError(400, "No Profile Found")
    }

    return res.status(200).json(
        new ApiResponse(200, profile, "Profile fetched successfully")
    )

}