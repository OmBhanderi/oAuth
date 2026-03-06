import { AppDataSource } from "../../config/data-source";
import { Users } from "../../entities/user.entity";
import { SignupDTO, LoginDTO } from "./auth.dto";
import bcrypt from "bcrypt";
import "dotenv/config";
import { signToken } from "../../utils/jwt.utils";

const userRepository = AppDataSource.getRepository(Users);

export class AuthService {
  static async signup(data: SignupDTO) {
    const { name, email, password } = data;

    const existingUser = await userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      // if user exists via oauth method alert user accordingly
      if (existingUser.provider && existingUser.provider !== "local") {
        throw new Error("User already exists. Please login with Google.");
      }
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);

    const token = signToken({ userId: user.id });

    return { email, token };
  }

  static async login(data: LoginDTO) {
    const { email, password } = data;

    const user = await userRepository.findOne({
      where: { email },
    });

    if (!user) {
      // user not found at all
      throw new Error("Email not found");
    }

    // user has no password because they registered via Google
    if (!user.password) {
      throw new Error("Please login with Google");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Password incorrect");
    }

    const token = signToken({ userId: user.id });

    return { email, token };
  }
}
