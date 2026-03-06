import jwt, { SignOptions } from "jsonwebtoken";

export const signToken = (payload: object) => {
  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET as string,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    } as SignOptions,
  );
  return token;
};

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    return decoded;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};
