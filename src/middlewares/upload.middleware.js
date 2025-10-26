// /middlewares/upload.middleware.js

import multer from "multer";

// Configuración de almacenamiento en memoria. 
// Esto es necesario para acceder al 'buffer' del archivo y subirlo a Cloudinary.
const storage = multer.memoryStorage();

// Definición de Multer
export const upload = multer({
  storage: storage,
  // Aumentar el límite de tamaño a 8 MB (8 * 1024 * 1024 bytes)
  // Las fotos de celular suelen ser pesadas y esto causa el error silencioso.
  limits: { 
    fileSize: 8 * 1024 * 1024 // 8 MB
  },
  // Opcional: Filtra solo archivos de imagen
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de archivo no soportado. Solo imágenes.'), false);
    }
  }
});
