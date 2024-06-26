import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RandomVerse = () => {
  const [verse, setVerse] = useState(null);
  const [error, setError] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [currentVerse, setCurrentVerse] = useState(null);

  const fetchRandomVerse = async () => {
    try {
      // Get a random chapter
      const chapter = Math.floor(Math.random() * 114) + 1;
      setCurrentChapter(chapter);

      // Fetch the number of verses in the selected chapter
      const responseChapter = await axios.get(
        `https://api.alquran.cloud/v1/surah/${chapter}`
      );
      const numberOfVerses = responseChapter.data.data.ayahs.length;

      // Get a random verse within the chapter
      const verseNumber = Math.floor(Math.random() * numberOfVerses) + 1;
      setCurrentVerse(verseNumber);

      // Fetch the verse in Arabic
      const responseArabic = await axios.get(
        `https://api.alquran.cloud/v1/ayah/${chapter}:${verseNumber}/quran-simple`
      );

      // Fetch the verse in English
      const responseEnglish = await axios.get(
        `https://api.alquran.cloud/v1/ayah/${chapter}:${verseNumber}/en.sahih`
      );

      if (responseArabic.data.data && responseEnglish.data.data) {
        setVerse({
          arabic: responseArabic.data.data.text,
          english: responseEnglish.data.data.text
        });
      } else {
        setError('Verse not found');
      }
    } catch (err) {
      setError('Failed to fetch verse');
    }
  };

  useEffect(() => {
    fetchRandomVerse();
  }, []);

  const redirectToQuranCom = () => {
    if (currentChapter && currentVerse) {
      const url = `https://quran.com/${currentChapter}/${currentVerse}`;
      window.open(url, '_blank');
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!verse) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 rounded-lg text-left w-full max-w-lg mb-6" style={{ backgroundColor: '#F8F8F8' }}>
      <div className="flex items-center justify-between mb-10">
        <h5 className="font-normal">Ponder on an Ayah</h5>
        <img
          src="/images/refresh.png"
          alt="Refresh"
          className="shadow-md h-5 ml-2 cursor-pointer"
          onClick={fetchRandomVerse}
        />
      </div>
      <p className="text-center text-xl mb-4">{verse.arabic}</p>

      <p className="text-lg text-gray-700">
        {verse.english}
        <img
          src="/images/link.png"
          alt="Link"
          className="shadow-md h-4 ml-2 cursor-pointer inline"
          onClick={redirectToQuranCom}
        />
      </p>
    </div>
  );
};

export default RandomVerse;
