import axios from 'axios';

export default async function handler(req: any, res: any) {
  try {
    const response = await axios.get('http://localhost:1337/api/announcements');
    const announcements = response.data;

    res.status(200).json(announcements);
  } catch (error) {
    console.error('Error fetching prayer times:', error);
    res.status(500).json({ error: 'Failed to fetch prayer times' });
  }
}