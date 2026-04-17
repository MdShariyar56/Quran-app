import Link from "next/link";

async function getData() {
  const res = await fetch("http://localhost:3000/data/quran.json");
  return res.json();
}

export default async function Home() {
  const data = await getData();

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <h1 className="col-span-full text-2xl font-bold mb-4">
        Quran Surah List
      </h1>

      {data.map((surah) => (
        <Link key={surah.id} href={`/surah/${surah.id}`}>
          <div className="border p-4 rounded-lg hover:shadow cursor-pointer">
            <h2 className="text-xl font-semibold">{surah.name}</h2>
            <h2 className="text-xl font-semibold">{surah.transliteration}</h2>
            <p className="text-gray-500">{surah.arabic}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}