import type { NextApiRequest, NextApiResponse } from "next";
import { createQuestion, listAnsweredQuestions } from "@lib/questions/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const questions = await listAnsweredQuestions();
      return res.status(200).json({ questions });
    }

    if (req.method === "POST") {
      const body =
        typeof req.body?.body === "string"
          ? req.body.body.trim()
          : typeof req.body?.question === "string"
            ? req.body.question.trim()
            : "";

      if (!body) {
        return res.status(400).json({ message: "Please enter your question." });
      }

      if (body.length > 2000) {
        return res.status(400).json({ message: "Question is too long." });
      }

      const question = await createQuestion(body);
      return res.status(201).json({
        message:
          "Thank you. Your question has been submitted anonymously.",
        id: question.id,
      });
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error("[api/questions]", error);
    return res.status(500).json({
      message:
        "Unable to save your question right now. Please try again later.",
    });
  }
}
