import express from "express";
import { createNewId } from "../controllers/feedback.controller.js"; 
import { getfeedback } from "../controllers/feedback.controller.js";

const router = express.Router();

router.post("/feedback", createNewId);
router.post("/feedback/list" , getfeedback);

export default router; 
