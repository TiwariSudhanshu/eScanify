import { Router } from "express";
import { saveData, SaveFile } from "../controllers/save.controllers.js";
import { fetchAll, fetchData } from "../controllers/fetch.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { sendMail } from "../controllers/sendMail.controllers.js";

const router = Router();

router.route("/save").post(saveData)
router.route("/fetch").post(fetchData)
router.route("/saveExcel").post(upload.single('file'), SaveFile);
router.route("/fetchAll").get( fetchAll);
router.route("/sendMail").get(sendMail);

export default router;