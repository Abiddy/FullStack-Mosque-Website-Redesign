import crypto from "crypto";
import { getIronSession, type IronSession, type SessionOptions } from "iron-session";
import type { NextApiRequest, NextApiResponse } from "next";
import { GetServerSidePropsContext } from "next";

export type SheikhSession = {
  isLoggedIn?: boolean;
};

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET || "change-me-to-a-32-char-minimum-secret!!",
  cookieName: "iit_sheikh_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  },
};

export function getSheikhSession(
  req: NextApiRequest | GetServerSidePropsContext["req"],
  res: NextApiResponse | GetServerSidePropsContext["res"]
): Promise<IronSession<SheikhSession>> {
  return getIronSession<SheikhSession>(req, res, sessionOptions);
}

export function verifySheikhPassword(input: string): boolean {
  const expected = process.env.SHEIKH_PASSWORD;
  if (!expected || !input) return false;

  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;

  return crypto.timingSafeEqual(a, b);
}
