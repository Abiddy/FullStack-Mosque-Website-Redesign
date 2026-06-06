import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import TextFade from "./ui/TextFade";

const ShaderPanelBackground = dynamic(
  () =>
    import("@/components/ui/hero-section-with-smooth-bg-shader").then(
      (m) => m.ShaderPanelBackground
    ),
  { ssr: false }
);

type PublicQuestion = {
  id: string;
  body: string;
  answer: string;
  answered_at: string | null;
};

const AskQuestionSection = () => {
  const [view, setView] = useState<"form" | "list">("form");
  const [question, setQuestion] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");
  const [questions, setQuestions] = useState<PublicQuestion[]>([]);
  const [loadingList, setLoadingList] = useState(false);
  const ref = useRef(null);

  const fetchQuestions = useCallback(async () => {
    setLoadingList(true);
    try {
      const res = await fetch("/api/questions");
      const data = await res.json();
      if (res.ok) setQuestions(data.questions ?? []);
    } catch {
      setQuestions([]);
    } finally {
      setLoadingList(false);
    }
  }, []);

  useEffect(() => {
    if (view === "list") fetchQuestions();
  }, [view, fetchQuestions]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!question.trim()) {
      setStatus("error");
      setMessage("Please enter your question.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: question }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Something went wrong");

      setStatus("success");
      setMessage(
        data.message ||
          "Thank you. Your question has been submitted anonymously."
      );
      setQuestion("");
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    }
  };

  const formatDate = (iso: string | null) => {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section id="ask-a-question" className="fm-section px-6 py-12 md:py-16 lg:px-10">
      <div className="relative mx-auto flex min-h-[min(68vh,580px)] max-w-5xl flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-[#dee2de] px-6 py-14 md:min-h-[min(72vh,640px)] md:px-10 md:py-20">
        <ShaderPanelBackground
          distortion={0.85}
          swirl={0.55}
          speed={0.38}
          offsetX={0.12}
          veilOpacity="bg-white/22"
        />

        <div className="relative z-10 w-full max-w-3xl">
          <TextFade className="mb-8 text-center md:mb-10">
            <h2 className="font-pp text-[32px] leading-[0.95] text-[#2c2c2c] md:text-[50px]">
              Have a question?
            </h2>
          </TextFade>

          <div className="mb-5 flex justify-center">
            <button
              type="button"
              onClick={() => setView((v) => (v === "form" ? "list" : "form"))}
              className={`rounded-full border-2 px-5 py-2 font-pp text-sm transition-colors ${
                view === "list"
                  ? "border-[#2c2c2c] bg-[#2c2c2c] text-white"
                  : "border-white/60 bg-white/80 text-[#2c2c2c] backdrop-blur-sm hover:bg-white"
              }`}
            >
              Questions
            </button>
          </div>

          <div ref={ref} className="relative min-h-[72px]">
            <AnimatePresence mode="wait">
              {view === "form" ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  <form
                    onSubmit={handleSubmit}
                    className="glass-card flex items-center gap-3 rounded-2xl border border-white/40 bg-white/80 px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.08)] md:px-5 md:py-4"
                  >
                    <input
                      id="ask-question"
                      type="text"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      disabled={status === "loading"}
                      placeholder="Ask our Sheikh a Question Anonymously"
                      className="min-w-0 flex-1 border-0 bg-transparent font-pp text-base text-[#2c2c2c] placeholder:text-[#b4b8b4] focus:outline-none focus:ring-0 md:text-lg"
                      autoComplete="off"
                    />
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-white transition-colors hover:bg-[#2c2c2c] disabled:opacity-50 md:h-10 md:w-10"
                      aria-label="Send question"
                    >
                      <ArrowUp
                        className="h-4 w-4 md:h-[18px] md:w-[18px]"
                        strokeWidth={2}
                      />
                    </button>
                  </form>

                  {message && (
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mt-4 text-center text-sm ${
                        status === "success"
                          ? "text-[#2c2c2c]"
                          : "text-[#646464]"
                      }`}
                    >
                      {message}
                    </motion.p>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="list"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="fm-card max-h-[min(42vh,420px)] overflow-y-auto rounded-2xl border border-white/40 bg-white/85 p-4 backdrop-blur-sm md:p-6"
                >
                  {loadingList ? (
                    <p className="py-8 text-center text-sm text-[#646464]">
                      Loading…
                    </p>
                  ) : questions.length === 0 ? (
                    <p className="py-8 text-center font-pp text-[#646464]">
                      No answered questions yet. Check back soon.
                    </p>
                  ) : (
                    <ul className="space-y-5">
                      {questions.map((q) => (
                        <li
                          key={q.id}
                          className="border-b border-[#e8e8e8] pb-5 last:border-0 last:pb-0"
                        >
                          <p className="font-pp text-base leading-snug text-[#2c2c2c] md:text-lg">
                            {q.body}
                          </p>
                          <p className="mt-3 text-sm leading-relaxed text-[#444141]">
                            {q.answer}
                          </p>
                          {q.answered_at && (
                            <p className="mt-2 text-xs text-[#b4b8b4]">
                              Answered {formatDate(q.answered_at)}
                            </p>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AskQuestionSection;
