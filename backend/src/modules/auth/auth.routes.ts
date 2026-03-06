import { Router } from "express";
import { AuthController } from "./auth.controller";
import Passport from "../../config/passport";
import jwt, { SignOptions } from "jsonwebtoken";
import { validate } from "../../middleware/validate.middleware";
import { loginSchema, signupSchema } from "./auth.validation";

const router = Router();

router.post("/signup", validate(signupSchema), AuthController.signup);

router.post("/login", validate(loginSchema), AuthController.login);

router.get(
  "/google",
  Passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/google/callback",
  Passport.authenticate("google", { session: false }),
  AuthController.googleAuthSuccess,
);

export default router;
