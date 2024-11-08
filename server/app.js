import express from 'express';
import cors from 'cors'
import profileRouter from './routes/profile.routes.js';


const app = express();

app.use(cors(
    {
    origin: '*',
    credentials: true,
    }
))
app.use(express.json());

app.use("/api/v1/profile", profileRouter)


export {app}