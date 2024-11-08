import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

//files
import connectDB from "./config/db.js";
import userRoutes from "../backend/routes/userRoutes.js";
import genreRoutes from "../backend/routes/genreRoutes.js";
import moviesRoutes from "../backend/routes/moviesRoutes.js";
import uploadRoutes from "../backend/routes/uploadRoutes.js";
//configuration
dotenv.config();
connectDB();

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

//Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/genre", genreRoutes);
app.use("/api/v1/movies", moviesRoutes);
app.use("/api/v1/upload", uploadRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
