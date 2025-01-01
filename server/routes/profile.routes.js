import { Router } from "express";
import { SaveCertificate, saveData, SaveFile, downloadFile } from "../controllers/save.controllers.js";
import { fetchAll, fetchData } from "../controllers/fetch.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { sendMail } from "../controllers/sendMail.controllers.js";
import { upload2 } from "../middlewares/multer2.middleware.js";
import { clearAll } from "../controllers/clear.controllers.js";

const router = Router();

router.route("/save").post(saveData)
router.route("/fetch").post(fetchData)
router.route("/saveExcel").post(upload.single('file'), SaveFile);
router.route("/saveCertificate").post(upload2.single('file'), SaveCertificate);
router.route("/fetchAll").get( fetchAll);
router.route("/sendMail").get(sendMail);
router.route('/clearAll').post(clearAll)
router.get("/download/:fileId", downloadFile);


export default router;