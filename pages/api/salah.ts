import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get('http://localhost:1337/api/salat-times');
    const prayerTimes = response.data;

    res.status(200).json(prayerTimes);
  } catch (error) {
    console.error('Error fetching prayer times:', error);
    res.status(500).json({ error: 'Failed to fetch prayer times' });
  }
}
