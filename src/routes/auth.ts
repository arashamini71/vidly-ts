import express from "express";
import { authenticate } from "../controller/auth";
import _ from "lodash";

const router = express.Router();

router.post("/", authenticate);

export default router;
