import multer from "multer";

// Usamos memoria porque vamos a subir directo a Cloudinary
const storage = multer.memoryStorage();

export const upload = multer({ storage });
