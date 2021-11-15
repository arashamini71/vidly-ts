import express from "express";
import auth from "../middlewares/auth";
import * as rentalController from "../controller/rental";

const router = express.Router();

router.get("/", auth, rentalController.getAll);

router.post("/", auth, rentalController.create);

router.put("/:id", auth, rentalController.update);

router.delete("/:id", auth, rentalController.deleteById);

router.get("/:id", auth, rentalController.getById);

export default router;
