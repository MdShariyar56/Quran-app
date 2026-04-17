"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// ✅ async function
async function getData() {
  const res = await fetch("/data/quran.json");
  return res.json();
}

export default function Home() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getData().then((res) => setData(res));
  }, []);

  // 🔥 flatten all ayahs
  const allAyahs = data.flatMap((surah) =>
    surah.verses.map((v) => ({
      surahId: surah.id,
      surahName: surah.name,
      arabic: v.text,
      translation: v.translation,
    }))
  );

  // 🔍 filter
  const filtered = allAyahs.filter((a) =>
    a.translation.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Quran Surah List</h1>

      {/* 🔍 Search Input */}
      <input
        type="text"
        placeholder="Search translation..."
        className="border p-2 w-full mb-6 rounded"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {query ? (
        <div>
          {filtered.slice(0, 20).map((a, i) => (
            <Link key={i} href={`/surah/${a.surahId}`}>
              <div className="border p-4 mb-3 rounded hover:bg-gray-100">
                <p className="text-right text-xl">{a.arabic}</p>
                <p className="text-gray-600">{a.translation}</p>
                <p className="text-sm text-blue-500">
                  {a.surahName}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {data.map((surah) => (
            <Link key={surah.id} href={`/surah/${surah.id}`}>
              <div className="border p-4 rounded hover:shadow">
                <p className="text-xl">{surah.arabic}</p>
                <p className="text-gray-500">{surah.name}</p>
                <p className="text-gray-500">{surah.transliteration}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}