import express from "express";
import { analyzeLandingPage } from "../controllers/feedbackController";


const router = express.Router();

router.get('/analyze', analyzeLandingPage);

export default router;