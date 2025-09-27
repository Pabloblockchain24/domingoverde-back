import mongoose from "mongoose";
import config from "./config/config.js";

export const connectDB = async() => {
    await mongoose.connect(config.MONGO_URL)
    .then(() => {
        console.log("✅  Conectado a la base de datos")
    })
    .catch(error => {
        console.error("Error al conectarse a la base de datos", error);
    })
}



