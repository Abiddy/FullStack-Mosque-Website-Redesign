import { useEffect, useState } from "react";

const ROWS = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"] as const;

type Timings = Record<string, string>;

type AladhanPayload = {
  data?: {
    timings?: Timings;
    date?: {
      readable?: string;
      hijri?: {
        weekday?: { en?: string };
        day?: string;
        month?: { en?: string };
        year?: string;
      };
    };
  };
  code?: number;
  status?: string;
};

function cleanTime(raw: string | undefined): string {
  if (!raw) return "—";
  return raw.replace(/\s*\([^)]*\)\s*$/, "").trim();
}

const JUMUAH = [
  { label: "First", time: "1:20 PM" },
  { label: "Second", time: "2:00 PM" },
];

export default function PrayerTimesMinimal() {
  const [payload, setPayload] = useState<AladhanPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch("/api/prayerTimes");
        const json = await r.json();
        if (!r.ok) throw new Error(json?.error || "Request failed");
        if (!cancelled) setPayload(json);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Something went wrong");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const timings = payload?.data?.timings;
  const readable = payload?.data?.date?.readable;
  const hijri = payload?.data?.date?.hijri;
  const hijriLine =
    hijri?.weekday?.en && hijri?.day && hijri?.month?.en && hijri?.year
      ? `${hijri.weekday.en} · ${hijri.day} ${hijri.month.en} ${hijri.year}`
      : null;

  return (
    <div className="w-full max-w-[340px] mx-auto bg-transparent px-6 pt-3 pb-6 sm:pt-4 md:px-8 md:py-8 text-center">
      <p className="font-serif text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-stone-600 mb-5 sm:mb-6 md:mb-8">
        Prayer times
      </p>

      {loading && (
        <p className="font-serif text-sm text-stone-500 tracking-wide">Loading…</p>
      )}
      {error && !loading && (
        <p className="font-serif text-sm text-stone-700 tracking-wide">{error}</p>
      )}

      {!loading && !error && timings && (
        <>
          {readable && (
            <p className="font-serif text-sm md:text-[15px] tracking-wide text-[var(--ink)] mb-1">{readable}</p>
          )}
          {hijriLine && (
            <p className="font-serif text-[11px] md:text-xs text-stone-600 tracking-wide mb-10">{hijriLine}</p>
          )}

          <div className="space-y-5 text-left max-w-[240px] mx-auto">
            {ROWS.map((name) => (
              <div key={name} className="flex justify-between items-baseline gap-6 pb-1">
                <span className="font-serif text-[11px] md:text-xs uppercase tracking-[0.2em] text-stone-700">
                  {name}
                </span>
                <span className="font-serif text-sm md:text-[15px] tabular-nums tracking-wide text-[var(--ink)]">
                  {cleanTime(timings[name])}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-6">
            <p className="font-serif text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-stone-600 mb-6">
              Jumu‘ah
            </p>
            <div className="space-y-3 font-serif text-sm md:text-[15px] tracking-wide text-[var(--ink)]">
              {JUMUAH.map((j) => (
                <p key={j.label}>
                  <span className="text-stone-600">{j.label}</span>
                  <span className="mx-2 text-stone-400">·</span>
                  {j.time}
                </p>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
