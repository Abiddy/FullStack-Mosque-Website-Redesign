import axios from "axios";

/** Aladhan timingsByCity — Torrance, CA (adhan times). */
export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const params: Record<string, string | number | undefined> = {
      city: "Torrance",
      state: "California",
      country: "United States",
      method: 2,
      school: 1,
    };
    if (process.env.NEXT_PUBLIC_ALADHAN_API_KEY) {
      params.apikey = process.env.NEXT_PUBLIC_ALADHAN_API_KEY;
    }

    const response = await axios.get("https://api.aladhan.com/v1/timingsByCity", {
      params,
      timeout: 12000,
    });

    return res.status(200).json(response.data);
  } catch (error) {
    console.error("prayerTimes:", error);
    return res.status(500).json({ error: "Failed to fetch prayer times" });
  }
}
