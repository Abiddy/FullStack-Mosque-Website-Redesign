import axios from "axios";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

const TZ = "America/Los_Angeles";
const MASJIDAL_MONTHLY =
  "https://timing.athanplus.com/masjid/widgets/monthly";

/** IIT Torrance Masjidal / Athan Plus masjid id (override with MASJIDAL_MASJID_ID). */
const DEFAULT_MASJID_ID = "JdGOl7dP";

const PRAYER_KEYS = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"] as const;

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

/** Rows from PRAYER TIMINGS: [dom, hijriDay, weekday, fajr…isha]. */
function parseAdhanRows(html: string): string[][] {
  const start = html.indexOf("PRAYER TIMINGS");
  const end = html.indexOf('id="iqamah-table"');
  if (start === -1 || end === -1) {
    throw new Error("Prayer timings table not found");
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
  return rows;
}

type IqRow = { start: Date; fajr: string; dhuhr: string; asr: string; maghrib: string; isha: string };

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
    const tds = [...m[1].matchAll(/<td>([\s\S]*?)<\/td>/gi)].map((x) => cleanTime(x[1]));
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
  const ok = rows.filter((r) => r.start <= sod).sort((a, b) => b.start.getTime() - a.start.getTime());
  return ok[0] ?? null;
}

function parseJumuah(html: string): { label: string; time: string }[] {
  const i = html.indexOf('id="jumuah-table"');
  if (i === -1) return [];
  const sub = html.slice(i);
  const chunk = sub.slice(0, sub.indexOf("</table>"));
  const times = [...chunk.matchAll(/<td class="jumuah">([^<]*)<\/td>/gi)].map((x) => cleanTime(x[1]));
  const labels = [...chunk.matchAll(/<td class="jumuahText">([^<]*)<\/td>/gi)].map((x) =>
    cleanTime(x[1]).replace(/&#039;/g, "'")
  );
  return times.map((time, idx) => ({
    time,
    label: labels[idx] || `Jumu'ah ${idx + 1}`,
  }));
}

/**
 * Masjidal monthly HTML is the mosque’s source of truth: adhan + iqama bands + Jumu‘ah.
 * Aladhan cannot supply iqama for a specific masjid.
 */
export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const masjidId = process.env.MASJIDAL_MASJID_ID || DEFAULT_MASJID_ID;

  try {
    const zoned = utcToZonedTime(new Date(), TZ);
    const monthAnchor = format(zoned, "yyyy-MM") + "-01";
    const url = `${MASJIDAL_MONTHLY}?theme=1&masjid_id=${encodeURIComponent(masjidId)}&date=${monthAnchor}`;

    const { data: html } = await axios.get<string>(url, {
      timeout: 15000,
      responseType: "text",
      headers: { Accept: "text/html" },
    });

    const gregYear = zoned.getFullYear();
    const adhanRows = parseAdhanRows(html);
    const dom = zoned.getDate();
    const todayRow = adhanRows.find((r) => parseInt(r[0], 10) === dom);
    if (!todayRow) {
      throw new Error(`No prayer row for day ${dom} in this month view`);
    }

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

    return res.status(200).json({
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
    });
  } catch (error) {
    console.error("prayerTimes:", error);
    return res.status(500).json({ error: "Failed to fetch prayer times" });
  }
}
