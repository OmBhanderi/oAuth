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
      throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = signToken({ userId: user.id });

    return { email, token };
  }
}
