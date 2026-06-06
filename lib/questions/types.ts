export type QuestionStatus = "pending" | "answered";

export type Question = {
  id: string;
  body: string;
  answer: string | null;
  status: QuestionStatus;
  created_at: string;
  updated_at: string;
  answered_at: string | null;
};

export type PublicQuestion = Pick<
  Question,
  "id" | "body" | "answer" | "answered_at"
>;
