export default async function SurahPage({ params }) {
  const { id } = await params;

  const res = await fetch("http://localhost:3000/data/quran.json");
  const data = await res.json();
  const surah = data.find((s) => s.id == id);

  if (!surah) {
    return <div>Not Found</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{surah.name}</h1>
      <h1 className="text-2xl font-bold mb-4">{surah.transliteration}</h1>
      {surah.verses.map((v, i) => (
        <div key={i} className="mb-4 border p-4 rounded">
          <p className="text-xl">{v.text}</p>
          <p className="text-gray-500">{v.translation}</p>
        </div>
      ))}
    </div>
  );
}