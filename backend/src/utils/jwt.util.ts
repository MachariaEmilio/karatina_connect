import { SignJWT, jwtVerify } from "jose";
import { TextEncoder } from "util";

const encoder = new TextEncoder();

/**
 * Returns the encoded secret key from environment variables.
 * Throws an error if JWT_SECRET is not set.
 */
const getSecretKey = (): Uint8Array => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("❌ JWT_SECRET is not defined in environment variables.");
  }
  return encoder.encode(secret);
};

/**
 * Signs a JWT token with the user's ID.
 * @param userId - UUID of the user
 * @returns A signed JWT token (string)
 */
export const signToken = async (userId: string): Promise<string> => {
  const secret = getSecretKey();

  return new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(process.env.JWT_EXPIRES_IN || "7d")
    .sign(secret);
};

/**
 * Verifies the JWT and returns the decoded payload.
 * @param token - JWT string
 * @returns The decoded payload containing userId
 * @throws Error if token is invalid or missing userId
 */
export const verifyToken = async (
  token: string
): Promise<{ userId: string }> => {
  const secret = getSecretKey();

  const { payload } = await jwtVerify(token, secret);

  if (typeof payload.userId !== "string") {
    throw new Error("❌ Invalid token payload: missing userId.");
  }

  return { userId: payload.userId };
};
