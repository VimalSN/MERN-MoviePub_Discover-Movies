import express from "express";
const router = express.Router();

//Controllers
import {
  createGenre,
  updateGenre,
  listGenres,
  removeGenre,
  readGenre,
} from "../controllers/genreController.js";

//Middlewares
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

router.route("/").post(authenticate, authorizeAdmin, createGenre);
router.route("/:id").put(authenticate, authorizeAdmin, updateGenre);
router.route("/:id").delete(authenticate, authorizeAdmin, removeGenre);
router.route("/genres").get(listGenres);
router.route("/:id").get(readGenre);

export default router;
