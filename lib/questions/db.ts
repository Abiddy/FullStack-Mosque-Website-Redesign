import { sql } from "@vercel/postgres";
import type { Question, QuestionStatus } from "./types";

let schemaReady: Promise<void> | null = null;

export async function ensureSchema() {
  if (!schemaReady) {
    schemaReady = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS questions (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          body TEXT NOT NULL,
          answer TEXT,
          status VARCHAR(20) NOT NULL DEFAULT 'pending'
            CHECK (status IN ('pending', 'answered')),
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          answered_at TIMESTAMPTZ
        )
      `;
      await sql`
        CREATE INDEX IF NOT EXISTS questions_status_created_idx
        ON questions (status, created_at DESC)
      `;
    })();
  }
  return schemaReady;
}

function rowToQuestion(row: Record<string, unknown>): Question {
  return {
    id: String(row.id),
    body: String(row.body),
    answer: row.answer != null ? String(row.answer) : null,
    status: row.status as QuestionStatus,
    created_at: new Date(row.created_at as string).toISOString(),
    updated_at: new Date(row.updated_at as string).toISOString(),
    answered_at:
      row.answered_at != null
        ? new Date(row.answered_at as string).toISOString()
        : null,
  };
}

export async function createQuestion(body: string): Promise<Question> {
  await ensureSchema();
  const { rows } = await sql`
    INSERT INTO questions (body)
    VALUES (${body})
    RETURNING *
  `;
  return rowToQuestion(rows[0]);
}

export async function listAnsweredQuestions() {
  await ensureSchema();
  const { rows } = await sql`
    SELECT id, body, answer, answered_at
    FROM questions
    WHERE status = 'answered' AND answer IS NOT NULL
    ORDER BY answered_at DESC NULLS LAST, created_at DESC
  `;
  return rows.map((r) => ({
    id: String(r.id),
    body: String(r.body),
    answer: String(r.answer),
    answered_at:
      r.answered_at != null
        ? new Date(r.answered_at as string).toISOString()
        : null,
  }));
}

export async function listAllQuestions(): Promise<Question[]> {
  await ensureSchema();
  const { rows } = await sql`
    SELECT * FROM questions
    ORDER BY
      CASE status WHEN 'pending' THEN 0 ELSE 1 END,
      created_at DESC
  `;
  return rows.map(rowToQuestion);
}

export async function getQuestionById(id: string): Promise<Question | null> {
  await ensureSchema();
  const { rows } = await sql`SELECT * FROM questions WHERE id = ${id}`;
  if (!rows[0]) return null;
  return rowToQuestion(rows[0]);
}

export async function updateQuestionAnswer(
  id: string,
  answer: string
): Promise<Question | null> {
  await ensureSchema();
  const trimmed = answer.trim();
  const { rows } = await sql`
    UPDATE questions
    SET
      answer = ${trimmed},
      status = 'answered',
      answered_at = NOW(),
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `;
  if (!rows[0]) return null;
  return rowToQuestion(rows[0]);
}

export async function deleteQuestion(id: string): Promise<boolean> {
  await ensureSchema();
  const { rowCount } = await sql`DELETE FROM questions WHERE id = ${id}`;
  return (rowCount ?? 0) > 0;
}
