import express from "express";
import cors from "cors";
import projectRoute from "./modules/project/project.controller.js";
import serviceRoute from "./modules/service/service.controller.js";
import contactRoute from "./modules/contact/contact.controller.js";
import skillRoute from "./modules/skill/skill.controller.js";
import authRoute from "./modules/auth/auth.controller.js";
import { connectDB } from "./DB/connection.js";
import dotenv from "dotenv";
import notFoundHandler from "./common/utils/errorHandling/notFound.js";
import glopalErrorHandler from "./common/utils/errorHandling/globalErrorHandler.js";
import cookieParser from "cookie-parser";





export async function bootsrape() {
    const app = express();

    dotenv.config();
    
    // Determine allowed origins based on environment and common dev hosts
    const defaultOrigins = [
        "http://localhost:5500",
        "http://127.0.0.1:5501",
        "http://localhost:5501",
        "http://127.0.0.1:5500",
        "https://monem-one.vercel.app"
    ];
    const envOrigins = process.env.FRONTEND_URL
        ? process.env.FRONTEND_URL.split(",").map(url => url.trim()).filter(Boolean)
        : [];
    const allowedOrigins = Array.from(new Set([...defaultOrigins, ...envOrigins]));

    app.use(cors({
        origin: (origin, callback) => {
            if (!origin) return callback(null, true);
            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }
            if (process.env.NODE_ENV !== "production") {
                console.warn(`CORS blocked origin: ${origin}`);
            }
            callback(new Error("Not allowed by CORS"));
        },
        credentials: true,
        methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        optionsSuccessStatus: 200,
    }));


    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    app.use("/api/auth", authRoute);
    app.use("/api/projects", projectRoute);
    app.use("/api/services", serviceRoute);
    app.use("/api/skill", skillRoute);
    app.use("/api/contact", contactRoute);

    app.use((req, res, next) => {
        notFoundHandler(req, res, next);
    });

    app.use(glopalErrorHandler);

    connectDB()
        .then(() => console.log("✅ Database connected successfully"))
        .catch(err => console.error("❌ Database connection failed (server still running):", err.message));

    app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
    });
}
