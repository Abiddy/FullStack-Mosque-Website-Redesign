import { useEffect, useState } from "react";

type PrayerRow = { name: string; starts: string; iqama: string | null };

type MasjidalPayload = {
  source: "masjidal";
  date?: { readable?: string };
  prayers?: PrayerRow[];
  jumuah?: { label: string; time: string }[];
};

function iqamaCell(p: PrayerRow): string {
  if (p.iqama) return p.iqama;
  if (p.name === "Sunrise") return "";
  return "—";
}

export default function PrayerTimesMinimal() {
  const [payload, setPayload] = useState<MasjidalPayload | null>(null);
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

  const prayers = payload?.prayers;
  const readable = payload?.date?.readable;
  const jumuah = payload?.jumuah;

  return (
    <div className="w-full max-w-[380px] mx-auto bg-transparent px-6 pt-3 pb-6 sm:pt-4 md:px-8 md:py-8 text-center">
      <p className="font-serif text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-stone-600 mb-5 sm:mb-6 md:mb-8">
        Prayer times
      </p>

      {loading && (
        <p className="font-serif text-sm text-stone-500 tracking-wide">Loading…</p>
      )}
      {error && !loading && (
        <p className="font-serif text-sm text-stone-700 tracking-wide">{error}</p>
      )}

      {!loading && !error && prayers && prayers.length > 0 && (
        <>
          {readable && (
            <p className="font-serif text-sm md:text-[15px] tracking-wide text-[var(--ink)] mb-6 sm:mb-8">
              {readable}
            </p>
          )}

          <div className="w-full max-w-[340px] mx-auto text-left">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 sm:gap-x-5 items-baseline border-b border-stone-300/60 pb-2 mb-3">
              <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-stone-500" />
              <div className="grid grid-cols-2 gap-x-8 sm:gap-x-10 min-w-[9.5rem] sm:min-w-[10.5rem]">
                <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-stone-500 text-right">
                  Starts
                </span>
                <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-stone-500 text-right">
                  Iqamah
                </span>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-3.5">
              {prayers.map((p) => {
                const iq = iqamaCell(p);
                return (
                  <div
                    key={p.name}
                    className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 sm:gap-x-5 items-baseline"
                  >
                    <span className="font-serif text-[11px] md:text-xs uppercase tracking-[0.18em] text-stone-700">
                      {p.name}
                    </span>
                    <div className="grid grid-cols-2 gap-x-8 sm:gap-x-10 min-w-[9.5rem] sm:min-w-[10.5rem]">
                      <span className="font-serif text-sm md:text-[15px] tabular-nums tracking-wide text-[var(--ink)] text-right">
                        {p.starts}
                      </span>
                      <span
                        className={`font-serif text-sm md:text-[15px] tabular-nums tracking-wide text-right min-h-[1.25em] ${
                          p.iqama ? "text-[var(--ink)] font-medium" : "text-stone-400"
                        }`}
                      >
                        {iq || "\u00a0"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {jumuah && jumuah.length > 0 && (
            <div className="mt-10 sm:mt-12 pt-6 border-t border-stone-300/40">
              <p className="font-serif text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-stone-600 mb-5">
                Jumu‘ah
              </p>
              <div className="space-y-3 font-serif text-sm md:text-[15px] tracking-wide text-[var(--ink)]">
                {jumuah.map((j) => (
                  <p key={j.label}>
                    <span className="text-stone-600">{j.label}</span>
                    <span className="mx-2 text-stone-400">·</span>
                    {j.time}
                  </p>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
