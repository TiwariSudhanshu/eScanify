import express from 'express';
import cors from 'cors'
import profileRouter from './routes/profile.routes.js';


const app = express();

app.use(
  cors({
    origin: [
      "https://e-scanify.vercel.app", 
      "http://localhost:5173",
      "https://673a31c20571820f883b9e72--escanify.netlify.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // Enable this if your requests involve cookies or credentials
  })
);

app.use(express.json());

app.use("/api/v1/profile", profileRouter)


export {app}