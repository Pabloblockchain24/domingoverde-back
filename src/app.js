import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import orderRoutes from "./routes/order.routes.js";
import productRoutes from "./routes/products.routes.js";
import purchasesRoutes from "./routes/purchases.routes.js";
import campaignRoutes from "./routes/campaigns.routes.js";
import goalsRoutes from "./routes/goal.routes.js"
import authRoutes from "./routes/auth.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import recipeRoutes from "./routes/recipes.routes.js";


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

const allowedOrigins = [
   'https://www.domingoverde.cl',
    '*',
    'https://domingoverde-back.vercel.app',
    'https://domingoverde-front.vercel.app',
    'http://localhost:4321'
];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    credentials: true
};
app.use(cors(corsOptions));

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/purchases", purchasesRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/goals", goalsRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/recipes", recipeRoutes);

export default app; 
