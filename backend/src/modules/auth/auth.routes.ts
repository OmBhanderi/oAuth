import { Router } from "express";
import { AuthController } from "./auth.controller";
import Passport from "../../config/passport";
import jwt, { SignOptions } from "jsonwebtoken";

const router = Router();

router.post("/signup", AuthController.signup);

router.post("/login", AuthController.login);

router.get(
  "/google",
  Passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/google/callback",
  Passport.authenticate("google", { session: false }),
  (req, res) => {
    const user = req.user;

    // generate JWT here
    const token = jwt.sign(
      { user: user },
      process.env.JWT_SECRET as string,
      { expiresIn: process.env.JWT_EXPIRES_IN } as SignOptions,
    );

    res.redirect(`http://localhost:3000/login/oauth-success?token=${token}`);
  },
);

export default router;
