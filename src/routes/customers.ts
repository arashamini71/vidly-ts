import express from "express";
import auth from "../middlewares/auth";
import * as customerController from "../controller/customer";

const router = express.Router();

router.get("/", auth, customerController.getAll);

router.post("/", auth, customerController.create);

router.put("/:id", auth, customerController.update);

router.delete("/:id", auth, customerController.deleteById);

router.get("/:id", auth, customerController.getById);

export default router;
