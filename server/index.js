import { app } from "./app.js";
import dotenv from 'dotenv'
import connectDB from "./database/index.js";

dotenv.config({
    path: "./.env"
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log(`Server has started on port ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("Error in connecting to database : ", err)
})

