import multer from "multer";

// simpan sementara di memori
const storage = multer.memoryStorage();

export const upload = multer({ storage });
