import express from 'express';
import cors from 'cors'
import profileRouter from './routes/profile.routes.js';


const app = express();

app.use(cors(
    {
    origin: ["https://e-scanify-oqnjszl5z-sudhanshu-tiwaris-projects-8f656169.vercel.app"],
    credentials: true,
    }
))
app.use(express.json());

app.use("/api/v1/profile", profileRouter)


export {app}