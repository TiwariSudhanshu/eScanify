import { File } from "../models/file.models.js";
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


export const SaveCertificate = async(req,res)=>{
    try {
        const file = req.file;
        const {profileId} = req.body;
    
        const profile = await Profile.findById(profileId)
        if(!profile){
            throw new ApiError(400,"profile not found");
        }
    
        const savedFile = await File.create({
            fileName: file.originalname,
            contentType: file.mimetype,
            data: file.buffer,
          });
    
          profile.certificate = savedFile._id;
          await profile.save();
    
          res.status(200).json({
            message: "Certificate saved and associated with the profile successfully!",
            profile,
          });
    
    } catch (error) {
        console.log("Error in saving certificate:", error)
    }
}


export const downloadFile = async (req, res) => {
    try {
      const { fileId } = req.params; 
  
      const file = await File.findById(fileId);
      if (!file) {
        return res.status(404).json({ message: "File not found" });
      }
  
      res.set({
        "Content-Type": file.contentType,
        "Content-Disposition": `attachment; filename="${file.fileName}"`,
      });
  
      res.send(file.data);
    } catch (error) {
      console.error("Error in downloading file:", error);
      res.status(500).json({ message: "Internal server error" });
    }
};