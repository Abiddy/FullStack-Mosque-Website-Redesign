import { useState } from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import IITLogo from "./IITLogo";
import type { Question } from "@lib/questions/types";

type Props = {
  initialQuestions: Question[];
};

const SheikhDashboard = ({ initialQuestions }: Props) => {
  const [questions, setQuestions] = useState(initialQuestions);
  const [answers, setAnswers] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      initialQuestions.map((q) => [q.id, q.answer ?? ""])
    )
  );
  const [filter, setFilter] = useState<
    "all" | "pending" | "draft" | "published"
  >("all");
  const [savingId, setSavingId] = useState<string | null>(null);
  const [publishingId, setPublishingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const filtered = questions.filter((q) => {
    if (filter === "pending") return q.status === "pending";
    if (filter === "draft")
      return q.status === "answered" && !q.published;
    if (filter === "published") return q.published;
    return true;
  });

  const pendingCount = questions.filter((q) => q.status === "pending").length;
  const draftCount = questions.filter(
    (q) => q.status === "answered" && !q.published
  ).length;
  const publishedCount = questions.filter((q) => q.published).length;

  const handlePublish = async (id: string, publish: boolean) => {
    setError("");
    setPublishingId(id);
    try {
      const res = await fetch(`/api/sheikh/questions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(publish ? { publish: true } : { unpublish: true }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Update failed");

      setQuestions((prev) =>
        prev.map((q) => (q.id === id ? data.question : q))
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Update failed.");
    } finally {
      setPublishingId(null);
    }
  };

  const handleSave = async (id: string) => {
    const answer = answers[id]?.trim();
    if (!answer) {
      setError("Answer cannot be empty.");
      return;
    }
    setError("");
    setSavingId(id);
    try {
      const res = await fetch(`/api/sheikh/questions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Save failed");

      setQuestions((prev) =>
        prev.map((q) => (q.id === id ? data.question : q))
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed.");
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    setError("");
    try {
      const res = await fetch(`/api/sheikh/questions/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Delete failed");

      setQuestions((prev) => prev.filter((q) => q.id !== id));
      setConfirmDeleteId(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/sheikh/logout", { method: "POST" });
    window.location.href = "/sheikh";
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

  return (
    <AuroraBackground>
      <header className="border-b border-white/40 bg-white/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <IITLogo size={40} />
            <h1 className="font-pp text-2xl text-[#2c2c2c] md:text-3xl">
              Sheikh Q&amp;A
            </h1>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-full border-2 border-[#dde3dd] px-4 py-2 text-sm text-[#646464] hover:bg-[#eef1ed]"
          >
            Log out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-8">
        <div className="mb-6 flex flex-wrap gap-2">
          {(
            [
              ["all", `All (${questions.length})`],
              ["pending", `Pending (${pendingCount})`],
              ["draft", `Drafts (${draftCount})`],
              ["published", `Published (${publishedCount})`],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className={`rounded-full px-4 py-2 text-sm transition-colors ${
                filter === key
                  ? "bg-[#2c2c2c] text-white"
                  : "border-2 border-[#dee2de] text-[#646464] hover:border-[#b8beb8]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {error && (
          <p className="mb-4 text-sm text-red-600">{error}</p>
        )}

        {filtered.length === 0 ? (
          <p className="py-12 text-center text-[#646464]">No questions here.</p>
        ) : (
          <ul className="space-y-4">
            {filtered.map((q) => (
              <li
                key={q.id}
                className="fm-card rounded-2xl border-white/50 bg-white/85 p-5 shadow-sm backdrop-blur-sm md:p-6"
              >
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs uppercase tracking-wider ${
                      q.status === "pending"
                        ? "bg-amber-100 text-amber-800"
                        : q.published
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-sky-100 text-sky-800"
                    }`}
                  >
                    {q.status === "pending"
                      ? "pending"
                      : q.published
                        ? "published"
                        : "draft"}
                  </span>
                  <span className="text-xs text-[#b4b8b4]">
                    {formatDate(q.created_at)}
                  </span>
                </div>

                <p className="font-pp text-lg leading-snug text-[#2c2c2c]">
                  {q.body}
                </p>

                <textarea
                  value={answers[q.id] ?? ""}
                  onChange={(e) =>
                    setAnswers((prev) => ({
                      ...prev,
                      [q.id]: e.target.value,
                    }))
                  }
                  rows={4}
                  placeholder="Write your answer…"
                  className="mt-4 w-full resize-y rounded-xl border-2 border-[#dee2de] bg-white px-4 py-3 text-sm text-[#2c2c2c] focus:border-[#b8beb8] focus:outline-none"
                />

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleSave(q.id)}
                    disabled={savingId === q.id}
                    className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white hover:bg-[#2c2c2c] disabled:opacity-50"
                  >
                    {savingId === q.id ? "Saving…" : "Save answer"}
                  </button>
                  {q.published ? (
                    <button
                      type="button"
                      onClick={() => handlePublish(q.id, false)}
                      disabled={publishingId === q.id}
                      className="rounded-full border-2 border-[#dee2de] px-5 py-2 text-sm text-[#646464] hover:border-[#b8beb8] disabled:opacity-50"
                    >
                      {publishingId === q.id ? "Updating…" : "Unpublish"}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handlePublish(q.id, true)}
                      disabled={
                        publishingId === q.id || !answers[q.id]?.trim()
                      }
                      className="rounded-full border-2 border-emerald-600 bg-emerald-600 px-5 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
                    >
                      {publishingId === q.id
                        ? "Publishing…"
                        : "Publish to Answers"}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setConfirmDeleteId(q.id)}
                    className="rounded-full border-2 border-[#dee2de] px-5 py-2 text-sm text-[#646464] hover:border-red-300 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>

                {confirmDeleteId === q.id && (
                  <div className="mt-4 rounded-xl border-2 border-red-200 bg-red-50 p-4">
                    <p className="text-sm text-red-900">
                      Delete this question permanently? This cannot be undone.
                    </p>
                    <div className="mt-3 flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleDelete(q.id)}
                        disabled={deletingId === q.id}
                        className="rounded-full bg-red-700 px-4 py-2 text-sm text-white hover:bg-red-800 disabled:opacity-50"
                      >
                        {deletingId === q.id ? "Deleting…" : "Yes, delete"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(null)}
                        className="rounded-full border-2 border-[#dee2de] px-4 py-2 text-sm text-[#646464]"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </main>
    </AuroraBackground>
  );
};

export default SheikhDashboard;
