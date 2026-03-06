import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { signToken } from "../../utils/jwt.utils";
import { Users } from "../../entities/user.entity";

export class AuthController {
  static async signup(req: Request, res: Response) {
    try {
      const result = await AuthService.signup(req.body);

      res.status(201).json({
        success: true,
        message: "User created",
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const result = await AuthService.login(req.body);

      res.status(200).json({
        success: true,
        message: "Login successful",
        data: result,
      });
    } catch (error: any) {
      res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async googleAuthSuccess(req: Request, res: Response) {
    const user = req.user as Users;

    const token = signToken({ userId: user.id });

    res.redirect(`http://localhost:3000/login/oauth-success?token=${token}`);
  }
}
