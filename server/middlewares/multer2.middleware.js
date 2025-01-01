import multer from "multer";

const storage = multer.memoryStorage();

export const upload2 = multer({ storage: storage });