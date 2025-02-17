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
// help Express understand and extract data from requests, whether it's JSON data from an API call or form data from a webpage.
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

//Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/genre", genreRoutes);
app.use("/api/v1/movies", moviesRoutes);
app.use("/api/v1/upload", uploadRoutes);

const __dirname = path.resolve(); // returns the absolute path of the current working directory.  Example - C:\Users\JohnDoe\Projects\MyApp
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));







// By default, Express does NOT parse request bodies. So if a client sends data in a POST or PUT request, you can't 
// access it directly in req.body unless you use body-parser or built-in middleware (express.json() in newer versions).

// Middleware           	                     Purpose	               Example Input	                    Output (req.body)
// express.json()	                         Parses JSON requests	{ "name": "John" }	                      { name: "John" }
// express.urlencoded({ extended: true })	 Parses form data	    username=Alice&email=alice@example.com	  { username: "Alice", email: "alice@example.com" }



/* This makes the "uploads" folder publicly accessible so that files stored inside it can be accessed via a URL.

✅ const __dirname = path.resolve();

Gets the absolute path of the project’s root directory.
This ensures our file paths work correctly on any system (Windows, Mac, Linux).

✅ app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

This tells Express to serve static files (like images, PDFs, videos) from the uploads/ folder.
Any file inside uploads/ can now be accessed through a URL like:

    http://localhost:5000/uploads/image.png */


// Imagine you're at home, and you tell a friend:

// "Go to the mall" (relative path)
// "Go to 123 Main Street, Springfield" (absolute path)
// 🔹 path.resolve() always gives the full absolute address, so there's no confusion! 🚀