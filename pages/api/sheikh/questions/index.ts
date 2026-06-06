import type { NextApiRequest, NextApiResponse } from "next";
import { listAllQuestions } from "@lib/questions/db";
import { getSheikhSession } from "@lib/sheikh/session";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSheikhSession(req, res);
  if (!session.isLoggedIn) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const questions = await listAllQuestions();
    return res.status(200).json({ questions });
  } catch (error) {
    console.error("[api/sheikh/questions]", error);
    return res.status(500).json({ message: "Failed to load questions." });
  }
}
