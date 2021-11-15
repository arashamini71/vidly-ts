import express from "express";
import auth from "../middlewares/auth";
import * as movieController from "../controller/movie";

const router = express.Router();

router.get("/", auth, movieController.getAll);

router.post("/", auth, movieController.create);

router.put("/:id", auth, movieController.update);

router.delete("/:id", auth, movieController.deleteById);

router.get("/:id", auth, movieController.getById);

export default router;
