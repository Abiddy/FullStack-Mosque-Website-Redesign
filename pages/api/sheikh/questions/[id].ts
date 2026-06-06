import type { NextApiRequest, NextApiResponse } from "next";
import {
  deleteQuestion,
  getQuestionById,
  publishQuestion,
  unpublishQuestion,
  updateQuestionAnswer,
} from "@lib/questions/db";
import { getSheikhSession } from "@lib/sheikh/session";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSheikhSession(req, res);
  if (!session.isLoggedIn) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const id = typeof req.query.id === "string" ? req.query.id : "";
  if (!id) {
    return res.status(400).json({ message: "Missing question id." });
  }

  try {
    if (req.method === "PATCH") {
      const publish = req.body?.publish === true;
      const unpublish = req.body?.unpublish === true;
      const answer =
        typeof req.body?.answer === "string" ? req.body.answer : undefined;

      if (publish && unpublish) {
        return res.status(400).json({ message: "Invalid publish state." });
      }

      if (publish) {
        const existing = await getQuestionById(id);
        if (!existing?.answer?.trim()) {
          return res
            .status(400)
            .json({ message: "Save an answer before publishing." });
        }

        const updated = await publishQuestion(id);
        if (!updated) {
          return res.status(404).json({ message: "Question not found." });
        }
        return res.status(200).json({ question: updated });
      }

      if (unpublish) {
        const updated = await unpublishQuestion(id);
        if (!updated) {
          return res.status(404).json({ message: "Question not found." });
        }
        return res.status(200).json({ question: updated });
      }

      if (answer !== undefined) {
        if (!answer.trim()) {
          return res.status(400).json({ message: "Answer cannot be empty." });
        }

        const updated = await updateQuestionAnswer(id, answer);
        if (!updated) {
          return res.status(404).json({ message: "Question not found." });
        }
        return res.status(200).json({ question: updated });
      }

      return res.status(400).json({ message: "No valid update provided." });
    }

    if (req.method === "DELETE") {
      const existing = await getQuestionById(id);
      if (!existing) {
        return res.status(404).json({ message: "Question not found." });
      }
      await deleteQuestion(id);
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error("[api/sheikh/questions/[id]]", error);
    return res.status(500).json({ message: "Something went wrong." });
  }
}
