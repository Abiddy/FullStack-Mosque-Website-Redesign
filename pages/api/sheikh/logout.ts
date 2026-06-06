import type { NextApiRequest, NextApiResponse } from "next";
import { getSheikhSession } from "@lib/sheikh/session";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const session = await getSheikhSession(req, res);
  session.destroy();

  return res.status(200).json({ ok: true });
}
