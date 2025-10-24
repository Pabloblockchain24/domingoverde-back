import dotenv from "dotenv"

dotenv.config();

export default{
    port:process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    TOKEN_SECRET: process.env.TOKEN_SECRET,
    // this is for gmail email service
    GMAIL_USER: process.env.GMAIL_USER,
    GMAIL_APP_PASSWORD: process.env.GMAIL_APP_PASSWORD,
    // this is for brevo email service
    BREVO_API_KEY: process.env.BREVO_API_KEY,
    BREVO_SENDER: process.env.BREVO_SENDER,
    BREVO_DESTINO: process.env.BREVO_DESTINO,

    //this if for cloudinary
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
}