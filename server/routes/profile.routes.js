import { Router } from "express";
import { saveData } from "../controllers/save.controllers.js";
import { fetchData } from "../controllers/fetch.controllers.js";

const router = Router();

router.route("/save").post(saveData)
router.route("/fetch").post(fetchData)

export default router;