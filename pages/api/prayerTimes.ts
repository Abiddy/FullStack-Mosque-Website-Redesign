
import axios from 'axios';

export default async function handler(req: any, res: any) {
  try {
    const response = await axios.get('http://api.aladhan.com/v1/timingsByCity', {
      params: {
        city: 'Torrance',
        country: 'USA',
        method: 2,
        school: 1,
        apiKey: process.env.NEXT_PUBLIC_ALADHAN_API_KEY, // Make sure to set this in your .env file
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch prayer times' });
  }
}