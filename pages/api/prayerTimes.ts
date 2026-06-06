import type { NextApiRequest, NextApiResponse } from "next";
import {
  errorMessage,
  getMasjidalPrayerTimes,
} from "@lib/prayerTimes/masjidal";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const payload = await getMasjidalPrayerTimes();

    res.setHeader(
      "Cache-Control",
      payload.stale
        ? "public, s-maxage=60, stale-while-revalidate=300"
        : "public, s-maxage=300, stale-while-revalidate=3600"
    );

    return res.status(200).json(payload);
  } catch (error) {
    const message = errorMessage(error);
    console.error("prayerTimes:", message, error);
    return res.status(500).json({ error: "Failed to fetch prayer times" });
  }
}
