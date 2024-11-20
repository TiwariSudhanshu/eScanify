import { Profile } from "../models/profile.models.js";
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import xlsx from 'xlsx';


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
export const SaveFile = (async(req,res)=>{

    try {
      // access the excel file
      // read the excel file and store it in  variable
      // check whether excel file is empty or not
      // save to database
  
      const filePath = req.file ? req.file.path : 'undefined';
      if(!filePath){
          throw new ApiError(400, "No file upload")
      }
      
      const workbook = xlsx.readFile(filePath);
      const sheetname = workbook.SheetNames[0];
      const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetname]);
      if(!sheetData && sheetData.length == 0){
          throw new ApiError(400, "Excel file is empty");
      }
  
      // Save to database
      
      for (let row of sheetData){
         const name = row.Name ;
         const email = row.Email 
         if(name && email){
             await Profile.create({
                 name,
                 email
             })
         }else{
             console.log("Skipping row")
         }
      }
  
      res.status(200).json(
          new ApiResponse(200 , sheetData, "Profiles created successfully")
      )
    } catch (error) {
     console.log("Error", error)
     throw new ApiError(500, "Something failed")
    }
 
 })