import { Request, Response } from "express"
import { AuthService } from "./auth.service"

export class AuthController {

  static async signup(req: Request, res: Response) {
    try {
      const result = await AuthService.signup(req.body)

      res.status(201).json({
        message: "User created",
        data: result,
      })
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      })
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const result = await AuthService.login(req.body)

      res.status(200).json({
        message: "Login successful",
        data: result,
      })
    } catch (error: any) {
      res.status(401).json({
        message: error.message,
      })
    }
  }
}