import { useEffect, useState } from "react";
import { getSurahList, getSurahById } from "../api/surah.api.js";

const Tafser = () => {
  const [surahList, setSurahList] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchList = async () => {
      try {
        const res = await getSurahList();
        setSurahList(res.data.data);
      } catch (err) {
        console.error("Failed to load surah list");
      }
    };
    fetchList();
  }, []);


  const loadSurah = async (id) => {
    setLoading(true);
    try {
      const res = await getSurahById(id);
      setSelectedSurah(res.data.data);
    } catch (err) {
      console.error("Failed to load surah");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">

      <div className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Tafsir al-Qur’an
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Ayah-by-ayah explanation based on authentic sources, presented with
          clarity and reflection.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

        <aside className="lg:col-span-1 border border-white/10 rounded-2xl p-4 h-fit">
          <h3 className="text-lg font-semibold mb-4 text-emerald-400">
            Surah List
          </h3>

          <ul className="space-y-2 max-h-[70vh] overflow-y-auto pr-2">
            {surahList.map((s) => (
              <li
                key={s._id}
                onClick={() => loadSurah(s._id)}
                className="cursor-pointer rounded-lg px-3 py-2 text-sm
                hover:bg-white/5 transition flex justify-between"
              >
                <span>
                  {s.number}. {s.englishName}
                </span>
                <span className="text-gray-500">{s.numberOfAyahs}</span>
              </li>
            ))}
          </ul>
        </aside>


        <main className="lg:col-span-3">
          {!selectedSurah && (
            <div className="text-center text-gray-400 mt-20">
              Select a Surah to begin reading its Tafsir.
            </div>
          )}

          {loading && (
            <div className="text-center text-gray-400 mt-20">
              Loading Tafsir…
            </div>
          )}

          {selectedSurah && !loading && (
            <div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-2">
                  {selectedSurah.name}
                </h2>
                <p className="text-gray-400 text-sm">
                  Detailed explanation and reflections
                </p>
              </div>


              <div className="space-y-12">
                {selectedSurah.ayahs.map((a, idx) => (
                  <div
                    key={idx}
                    className="border border-white/10 rounded-2xl p-6"
                  >

                    <span className="inline-block mb-4 text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400">
                      Ayah {idx + 1}
                    </span>


                    <p className="text-2xl leading-loose text-right mb-6">
                      {a.ayah}
                    </p>


                    {a.shortMeaning?.length > 0 && (
                      <ul className="mb-4 text-sm text-gray-300 list-disc pl-5">
                        {a.shortMeaning.map((m, i) => (
                          <li key={i}>
                            {m}
                            {i === 0 && (
                              <span className="ml-1 italic text-gray-500">
                                — Saheeh International
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}


                    {a.explanation ? (
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {a.explanation}
                      </p>
                    ) : (
                      <p className="text-sm italic text-gray-500">
                        Tafsir not added yet.
                      </p>
                    )}


                    {a.reference && (
                      <p className="mt-4 text-xs text-gray-500 italic">
                        Reference: {a.reference}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Tafser;
