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

    const loadPrayerTimes = async (attempt = 1): Promise<void> => {
      try {
        const r = await fetch("/api/prayerTimes", { cache: "no-store" });
        const json = await r.json();

        if (!r.ok) {
          if (r.status >= 500 && attempt < 3) {
            await new Promise((resolve) => setTimeout(resolve, 600 * attempt));
            if (!cancelled) return loadPrayerTimes(attempt + 1);
            return;
          }
          throw new Error(json?.error || "Request failed");
        }

        if (!cancelled) {
          setPayload(json);
          setError(null);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Something went wrong");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadPrayerTimes();

    return () => {
      cancelled = true;
    };
  }, []);

  const prayers = payload?.prayers;
  const readable = payload?.date?.readable;
  const jumuah = payload?.jumuah;

  return (
    <div className="mx-auto w-full max-w-[480px] bg-white px-5 pt-4 pb-8 text-center font-sans text-black sm:px-7 sm:pt-5 sm:pb-9 md:px-8 md:py-8">
      <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.14em] text-[#646464] sm:mb-7 md:text-xs">
        Prayer times
      </p>

      {loading && (
        <p className="text-base font-medium text-black">Loading…</p>
      )}
      {error && !loading && (
        <p className="text-base font-medium text-black">{error}</p>
      )}

      {!loading && !error && prayers && prayers.length > 0 && (
        <>
          {readable && (
            <p className="mb-7 text-base font-semibold text-black sm:mb-9 md:text-lg">
              {readable}
            </p>
          )}

          <div className="mx-auto w-full max-w-[400px] md:max-w-[440px]">
            <div className="mb-4 grid grid-cols-3 gap-x-8 border-b border-[#e8e8e8] pb-3 sm:gap-x-10">
              <span />
              <span className="text-center text-[10px] font-medium uppercase tracking-[0.12em] text-[#646464] md:text-[11px]">
                Starts
              </span>
              <span className="text-center text-[10px] font-medium uppercase tracking-[0.12em] text-[#646464] md:text-[11px]">
                Iqamah
              </span>
            </div>

            <div className="space-y-4 sm:space-y-[1.125rem]">
              {prayers.map((p) => {
                const iq = iqamaCell(p);
                return (
                  <div
                    key={p.name}
                    className="grid grid-cols-3 items-baseline gap-x-8 sm:gap-x-10"
                  >
                    <span className="text-left text-xs font-medium uppercase tracking-wide text-[#646464] md:text-sm">
                      {p.name}
                    </span>
                    <span className="text-center text-base font-semibold tabular-nums text-black md:text-lg">
                      {p.starts}
                    </span>
                    <span
                      className={`min-h-[1.25em] text-center text-base font-semibold tabular-nums text-black md:text-lg ${
                        p.iqama ? "" : "opacity-40"
                      }`}
                    >
                      {iq || "\u00a0"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {jumuah && jumuah.length > 0 && (
            <div className="mt-11 border-t border-[#e8e8e8] pt-7 sm:mt-14 sm:pt-8">
              <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.14em] text-[#646464] md:text-xs">
                Jumu&apos;ah
              </p>
              <div className="space-y-3.5 text-base font-medium text-black md:text-lg">
                {jumuah.map((j) => (
                  <p key={j.label}>
                    <span>{j.label}</span>
                    <span className="mx-2 opacity-40">·</span>
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
