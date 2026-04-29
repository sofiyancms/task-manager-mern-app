import express from "express";
import validator from "../middlewares/validator.js";
import { loginSchema, registerSchema } from "../validators/authValidator.js";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

// Register route
router.post("/register", validator(registerSchema), register);

// Login route
router.post("/login", validator(loginSchema), login);
export default router;
