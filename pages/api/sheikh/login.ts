import type { NextApiRequest, NextApiResponse } from "next";
import { getSheikhSession, verifySheikhPassword } from "@lib/sheikh/session";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  if (!process.env.SHEIKH_PASSWORD) {
    return res.status(503).json({ message: "Sheikh login is not configured." });
  }

  const password =
    typeof req.body?.password === "string" ? req.body.password : "";

  if (!verifySheikhPassword(password)) {
    return res.status(401).json({ message: "Incorrect password." });
  }

  const session = await getSheikhSession(req, res);
  session.isLoggedIn = true;
  await session.save();

  return res.status(200).json({ ok: true });
}
