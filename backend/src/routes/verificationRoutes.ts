import { Router } from "express";
import { getVerificationStatusHandler } from "../controllers/verificationController";

const router = Router();

// GET /verification/:clientId
router.get("/:clientId", getVerificationStatusHandler);

export default router;
