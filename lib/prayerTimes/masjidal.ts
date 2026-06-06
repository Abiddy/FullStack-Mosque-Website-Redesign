import axios, { AxiosError } from "axios";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

const TZ = "America/Los_Angeles";
const MASJIDAL_MONTHLY =
  "https://timing.athanplus.com/masjid/widgets/monthly";
const DEFAULT_MASJID_ID = "JdGOl7dP";
const CACHE_TTL_MS = 10 * 60 * 1000;

export const PRAYER_KEYS = [
  "Fajr",
  "Sunrise",
  "Dhuhr",
  "Asr",
  "Maghrib",
  "Isha",
] as const;

const MONTH_MAP: Record<string, number> = {
  JAN: 0,
  FEB: 1,
  MAR: 2,
  APR: 3,
  MAY: 4,
  JUN: 5,
  JUL: 6,
  AUG: 7,
  SEP: 8,
  OCT: 9,
  NOV: 10,
  DEC: 11,
};

export type PrayerTimesPayload = {
  source: "masjidal";
  masjidId: string;
  stale?: boolean;
  date: { readable: string };
  prayers: { name: string; starts: string; iqama: string | null }[];
  jumuah: { label: string; time: string }[];
};

type CacheEntry = {
  monthKey: string;
  fetchedAt: number;
  payload: PrayerTimesPayload;
};

let memoryCache: CacheEntry | null = null;

function cleanTime(s: string): string {
  return s.replace(/\s+/g, " ").trim();
}

function addMinutesToTime(time: string, minutes: number): string {
  const match = time.trim().match(/^(\d{1,2}):(\d{2})(?:\s*(AM|PM))?$/i);
  if (!match) return time;

  let hours = parseInt(match[1], 10);
  const mins = parseInt(match[2], 10);
  const meridiem = match[3]?.toUpperCase();

  if (meridiem === "PM" && hours !== 12) hours += 12;
  if (meridiem === "AM" && hours === 12) hours = 0;

  const total = hours * 60 + mins + minutes;
  const newHours24 = Math.floor(total / 60) % 24;
  const newMins = total % 60;

  if (meridiem) {
    const h12 = newHours24 % 12 || 12;
    const suffix = newHours24 >= 12 ? "PM" : "AM";
    return `${h12}:${String(newMins).padStart(2, "0")} ${suffix}`;
  }

  return `${newHours24}:${String(newMins).padStart(2, "0")}`;
}

function parseAdhanRows(html: string): string[][] {
  const start = html.indexOf("PRAYER TIMINGS");
  const end = html.indexOf('id="iqamah-table"');
  if (start === -1 || end === -1) {
    throw new Error("Prayer timings table not found in upstream HTML");
  }

  const chunk = html.slice(start, end);
  const rows: string[][] = [];
  const trRe = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
  let m: RegExpExecArray | null;

  while ((m = trRe.exec(chunk)) !== null) {
    const inner = m[1];
    const spans = [...inner.matchAll(/<span>([^<]*)<\/span>/gi)].map((x) =>
      cleanTime(x[1]).replace(/\s+/g, " ")
    );
    if (spans.length !== 9) continue;
    const dom = parseInt(spans[0], 10);
    if (dom >= 1 && dom <= 31) rows.push(spans);
  }

  if (rows.length === 0) {
    throw new Error("No adhan rows parsed from upstream HTML");
  }

  return rows;
}

type IqRow = {
  start: Date;
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
};

function parseIqamahRows(html: string, gregorianYear: number): IqRow[] {
  const i = html.indexOf('id="iqamah-table"');
  if (i === -1) return [];

  const sub = html.slice(i);
  const end = sub.indexOf("</table>");
  const chunk = sub.slice(0, end);
  const out: IqRow[] = [];
  const trRe = /<tr class="regCell">([\s\S]*?)<\/tr>/gi;
  let m: RegExpExecArray | null;

  while ((m = trRe.exec(chunk)) !== null) {
    const tds = [...m[1].matchAll(/<td>([\s\S]*?)<\/td>/gi)].map((x) =>
      cleanTime(x[1])
    );
    if (tds.length < 6) continue;

    const label = tds[0];
    const mm = label.match(/^([A-Z]{3}),\s*(\d{1,2})$/i);
    if (!mm) continue;

    const mon = MONTH_MAP[mm[1].toUpperCase()];
    if (mon === undefined) continue;

    const day = parseInt(mm[2], 10);
    out.push({
      start: new Date(gregorianYear, mon, day),
      fajr: tds[1],
      dhuhr: tds[2],
      asr: tds[3],
      maghrib: tds[4],
      isha: tds[5],
    });
  }

  return out;
}

function pickIqamahRow(rows: IqRow[], localDay: Date): IqRow | null {
  const y = localDay.getFullYear();
  const mo = localDay.getMonth();
  const d = localDay.getDate();
  const sod = new Date(y, mo, d);
  const ok = rows
    .filter((r) => r.start <= sod)
    .sort((a, b) => b.start.getTime() - a.start.getTime());
  return ok[0] ?? null;
}

function parseJumuah(html: string): { label: string; time: string }[] {
  const i = html.indexOf('id="jumuah-table"');
  if (i === -1) return [];

  const sub = html.slice(i);
  const chunk = sub.slice(0, sub.indexOf("</table>"));
  const times = [...chunk.matchAll(/<td class="jumuah">([^<]*)<\/td>/gi)].map(
    (x) => cleanTime(x[1])
  );
  const labels = [
    ...chunk.matchAll(/<td class="jumuahText">([^<]*)<\/td>/gi),
  ].map((x) => cleanTime(x[1]).replace(/&#039;/g, "'"));

  return times.map((time, idx) => ({
    time,
    label: labels[idx] || `Jumu'ah ${idx + 1}`,
  }));
}

function pickTodayRow(rows: string[][], dom: number): string[] {
  const exact = rows.find((r) => parseInt(r[0], 10) === dom);
  if (exact) return exact;

  const eligible = rows
    .map((r) => ({ row: r, dom: parseInt(r[0], 10) }))
    .filter((x) => x.dom >= 1 && x.dom <= 31 && x.dom <= dom)
    .sort((a, b) => b.dom - a.dom);

  if (eligible[0]) return eligible[0].row;

  throw new Error(`No prayer row for day ${dom} in this month view`);
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchMasjidalHtml(url: string, attempts = 3): Promise<string> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const { data, status } = await axios.get<string>(url, {
        timeout: 12000,
        responseType: "text",
        headers: {
          Accept: "text/html,application/xhtml+xml",
          "Accept-Language": "en-US,en;q=0.9",
          "User-Agent":
            "Mozilla/5.0 (compatible; IITMasjid/1.0; +https://www.ictorrance.org)",
        },
        validateStatus: (code) => code >= 200 && code < 300,
      });

      if (typeof data !== "string" || data.length < 500) {
        throw new Error(`Upstream HTML too short (status ${status})`);
      }

      if (!data.includes("PRAYER TIMINGS")) {
        throw new Error("Upstream HTML missing prayer timings table");
      }

      return data;
    } catch (error) {
      lastError = error;
      const retryable =
        axios.isAxiosError(error) &&
        (!error.response ||
          error.response.status >= 500 ||
          error.code === "ECONNABORTED" ||
          error.code === "ECONNRESET" ||
          error.code === "ETIMEDOUT");

      if (attempt < attempts && retryable) {
        await sleep(400 * attempt);
        continue;
      }
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("Failed to fetch Masjidal prayer times");
}

function buildPayload(html: string, masjidId: string): PrayerTimesPayload {
  const zoned = utcToZonedTime(new Date(), TZ);
  const gregYear = zoned.getFullYear();
  const dom = zoned.getDate();

  const adhanRows = parseAdhanRows(html);
  const todayRow = pickTodayRow(adhanRows, dom);

  const iqRows = parseIqamahRows(html, gregYear);
  const iq = pickIqamahRow(iqRows, zoned);

  const starts: Record<string, string> = {};
  PRAYER_KEYS.forEach((key, idx) => {
    starts[key] = cleanTime(todayRow[3 + idx]);
  });

  const iqama: Record<string, string | null> = {
    Fajr: iq ? cleanTime(iq.fajr) : null,
    Sunrise: null,
    Dhuhr: iq ? cleanTime(iq.dhuhr) : null,
    Asr: iq ? cleanTime(iq.asr) : null,
    Maghrib: addMinutesToTime(starts.Maghrib, 5),
    Isha: iq ? cleanTime(iq.isha) : null,
  };

  const jumuah = parseJumuah(html);

  return {
    source: "masjidal",
    masjidId,
    date: {
      readable: format(zoned, "EEE, d MMM yyyy"),
    },
    prayers: PRAYER_KEYS.map((name) => ({
      name,
      starts: starts[name],
      iqama: iqama[name],
    })),
    jumuah: jumuah.length
      ? jumuah
      : [
          { label: "Jumu'ah 1", time: "12:20 PM" },
          { label: "Jumu'ah 2", time: "1:20 PM" },
        ],
  };
}

export async function getMasjidalPrayerTimes(
  masjidId = process.env.MASJIDAL_MASJID_ID || DEFAULT_MASJID_ID
): Promise<PrayerTimesPayload> {
  const zoned = utcToZonedTime(new Date(), TZ);
  const monthKey = format(zoned, "yyyy-MM");

  if (
    memoryCache &&
    memoryCache.monthKey === monthKey &&
    Date.now() - memoryCache.fetchedAt < CACHE_TTL_MS
  ) {
    return memoryCache.payload;
  }

  const monthAnchor = `${monthKey}-01`;
  const url = `${MASJIDAL_MONTHLY}?theme=1&masjid_id=${encodeURIComponent(masjidId)}&date=${monthAnchor}`;

  try {
    const html = await fetchMasjidalHtml(url);
    const payload = buildPayload(html, masjidId);

    memoryCache = {
      monthKey,
      fetchedAt: Date.now(),
      payload,
    };

    return payload;
  } catch (error) {
    if (memoryCache && memoryCache.monthKey === monthKey) {
      console.warn("prayerTimes: serving stale cache after upstream failure", {
        message: error instanceof Error ? error.message : String(error),
      });
      return { ...memoryCache.payload, stale: true };
    }

    throw error;
  }
}

export function errorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
      return "Prayer times service timed out. Please refresh.";
    }
    if (error.response?.status) {
      return `Prayer times service unavailable (${error.response.status}). Please refresh.`;
    }
  }

  if (error instanceof Error) return error.message;
  return "Failed to fetch prayer times";
}
