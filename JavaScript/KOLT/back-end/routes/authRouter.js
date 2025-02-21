import express from "express";
import * as authController from "../controllers/auth-controller.js";
const router = express.Router();

// /server/api/auth

router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/log-out", authController.logout);
router.get("/check-session", authController.checkSession);
export default router;
