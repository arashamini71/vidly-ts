import express from "express";
import auth from "../middlewares/auth";
import admin from "../middlewares/admin";
import * as genreController from "../controller/genre";

const router = express.Router();

router.get("/", genreController.getAll);

router.get("/:id", genreController.getById);

router.post("/", auth, genreController.create);

router.put("/:id", auth, genreController.update);

router.delete("/:id", [auth, admin], genreController.deleteById);

export default router;
