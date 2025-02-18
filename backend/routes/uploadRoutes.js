import path from "path"; 
import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // This should point to the correct folder where it should be saved 
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${extname}`);  // this is how filename will be stored 
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png||image\/webp/;

  const extname = path.extname(file.originalname);
  const mimetype = file.mimetype;

  if (filetypes.test(extname) && mimetypes.test(mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Images only"), false);
  }
};

const upload = multer({ storage, fileFilter }); //Uses our storage settings & file filter.
const uploadSingleImage = upload.single("image");

router.post("/", (req, res) => {
  uploadSingleImage(req, res, (err) => {
    if (err) {
      console.error("Error during upload:", err); // Log the error
      res.status(400).send({ message: err.message || "Failed to upload image" });
    } else if (req.file) {
      // Correct the file path to use forward slashes
      console.log("File uploaded:", req.file); 
      const filePath = req.file.path.replace("\\", "/"); // Replace backslashes with forward slashes
      res.status(200).send({
        message: "Image uploaded successfully",
        image: `/${filePath}`, // Send the correct path in the response
      });
    } else {
      console.error("No file received in the request.");
      res.status(400).send({ message: "No image file provided" });
    }
  });
});

export default router;







// ✔ When a user uploads an image, this route gets triggered.
// ✔ It calls uploadSingleImage(req, res, callback):

// If there's an error (wrong file type, no file selected) → Returns 400 (Bad Request).
// If the file is uploaded successfully → Sends back image path & success message.
// If no file is provided → Returns an error.

// {
//   "message": "Image uploaded successfully",
//   "image": "/uploads/image-1707162035000.jpg"
// }


// 1. multer.diskStorage → Defines how & where files are stored.
// 2. fileFilter → Ensures only images are uploaded.
// 3. upload.single("image") → Allows only one file upload at a time.
// 4. POST /upload → Handles the file upload and returns the image path.
