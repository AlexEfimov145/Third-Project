import express, { Router } from "express";
import validate from "../middlewares/input-validation";
import { signupValidator, loginValidator } from "../controllers/auth/Validator";
import { signup, login, isAdmin } from "../controllers/auth/Controller";
import enforceGuest from "../middlewares/enforce-guest";

const router = Router();
// router.use(enforceGuest);

router.post('/register', validate(signupValidator), signup);
router.post('/login', validate(loginValidator), login);
router.get('/role/:id([0-9]+)', isAdmin);

export default router;