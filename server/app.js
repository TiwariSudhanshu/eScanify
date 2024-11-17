import express from 'express';
import cors from 'cors'
import profileRouter from './routes/profile.routes.js';


const app = express();

app.use(
  cors({
    origin: ["https://e-scanify.vercel.app", "http://localhost:5173",
       "https://673a017a419b9300080d2f3e--escanify.netlify.app/",
        "https://escanify.netlify.app/"
    ], 
  })
);

app.use(express.json());

app.use("/api/v1/profile", profileRouter)


export {app}