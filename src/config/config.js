import dotenv from "dotenv"

dotenv.config();

export default{
    port:process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    TOKEN_SECRET: process.env.TOKEN_SECRET,
    GMAIL_USER: process.env.GMAIL_USER,
    GMAIL_APP_PASSWORD: process.env.GMAIL_APP_PASSWORD
}