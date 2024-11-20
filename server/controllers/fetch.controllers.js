import { Profile } from "../models/profile.models.js";
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import mongoose from "mongoose";


export const fetchData = async ( req, res )=>{
    const { id } = req.body;

    if (!mongoose.isValidObjectId(id)) {
        throw new ApiError(400, "Invalid ID format");
    }
    const profile = await Profile.findById(id)

    if(!profile){
        throw ApiError(400, "No Profile Found")
    }

    return res.status(200).json(
        new ApiResponse(200, profile, "Profile fetched successfully")
    )

}

export const fetchAll = async(req,res)=>{
    const profiles = await Profile.find();

    if(!profiles){
        throw new ApiError(400, "Profile not fetched")
    }

    res.status(200).json(
        new ApiResponse(200, profiles, "Fetched all profiles")
    )

}