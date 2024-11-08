import { Router } from "express";
import { saveData } from "../controllers/save.controllers.js";

const router = Router();

router.route("/save").post(saveData)

export default router;