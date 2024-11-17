import express from 'express';
import cors from 'cors'
import profileRouter from './routes/profile.routes.js';


const app = express();

app.use(
  cors({
    origin: ["https://e-scanify.vercel.app", "http://localhost:5173", "https://6739fff1a0fc2eda865db429--escanify.netlify.app"], 
  })
);

app.use(express.json());

app.use("/api/v1/profile", profileRouter)


export {app}