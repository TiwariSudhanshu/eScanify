import mongoose from 'mongoose'

const fileSchema = mongoose.Schema({
    fileName:{
        type: String,
        required: true
    },
    contentType: { 
        type: String,
         required: true
    },
    data:
     { 
        type: Buffer,
         required: true 
    }, 
    uploadDate: { 
        type: Date,
        default: Date.now }
},{timestamps:true})

export const File = mongoose.model('File', fileSchema)