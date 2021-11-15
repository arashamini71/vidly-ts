import express from "express";
import _ from "lodash";
import auth from "../middlewares/auth";
import { getCurrent, register } from "../controller/user";

const router = express.Router();

router.get("/me", auth, getCurrent);

router.post("/", register);

export default router;
