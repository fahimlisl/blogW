import { useEffect, useState } from "react";
import {
  fetchSurahList,
  fetchSurah,
  updateExplanation,
  addShortMeaning,
} from "../../api/adminTafser.api";

const AdminTafser = () => {
  const [surahList, setSurahList] = useState([]);
  const [filteredSurahs, setFilteredSurahs] = useState([]);
  const [search, setSearch] = useState("");

  const [selectedSurahId, setSelectedSurahId] = useState("");
  const [surah, setSurah] = useState(null);
  const [loading, setLoading] = useState(false);

  const [editingAyahId, setEditingAyahId] = useState(null);
  const [explanationText, setExplanationText] = useState("");

  const [shortMeaningMap, setShortMeaningMap] = useState({});

  useEffect(() => {
    const load = async () => {
      const res = await fetchSurahList();
      setSurahList(res.data.data || []);
      setFilteredSurahs(res.data.data || []);
    };
    load();
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFilteredSurahs(surahList);
    } else {
      const q = search.toLowerCase();
      setFilteredSurahs(
        surahList.filter(
          (s) =>
            s.englishName.toLowerCase().includes(q) ||
            String(s.number).includes(q)
        )
      );
    }
  }, [search, surahList]);

  const loadSurah = async (id) => {
    setLoading(true);
    setSelectedSurahId(id);
    try {
      const res = await fetchSurah(id);
      setSurah(res.data.data);
    } catch {
      alert("Failed to load surah");
    } finally {
      setLoading(false);
    }
  };

  const saveExplanation = async (ayahId) => {
    if (!explanationText.trim()) {
      alert("Explanation is required");
      return;
    }
    await updateExplanation(ayahId, explanationText);
    setEditingAyahId(null);
    setExplanationText("");
    loadSurah(selectedSurahId);
  };

  const saveShortMeaning = async (ayahId) => {
    const text = shortMeaningMap[ayahId];
    if (!text || !text.trim()) return;

    await addShortMeaning(ayahId, text);

    setShortMeaningMap((prev) => ({
      ...prev,
      [ayahId]: "",
    }));

    loadSurah(selectedSurahId);
  };

  const totalAyahs = surah?.ayahs?.length || 0;
  const completedAyahs =
    surah?.ayahs?.filter(
      (a) => a.explanation?.trim() && a.shortMeaning?.length > 0
    ).length || 0;

  const progressPercent =
    totalAyahs > 0 ? Math.round((completedAyahs / totalAyahs) * 100) : 0;

  return (
    <div className="flex gap-8 h-[calc(100vh-120px)]">
      <aside className="w-72 border border-white/10 rounded-2xl p-4 flex flex-col">
        <input
          placeholder="Search surah…"
          className="mb-4 bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex-1 overflow-y-auto space-y-1 pr-1">
          {filteredSurahs.map((s) => (
            // <button
            //   key={s._id}
            //   onClick={() => loadSurah(s._id)}
            //   className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition
            //     ${
            //       selectedSurahId === s._id
            //         ? "bg-emerald-500/20 text-emerald-400"
            //         : "hover:bg-white/5"
            //     }`}
            // >
            //   <span>
            //     {s.number}. {s.englishName}
            //   </span>

            //   {s.isCompleted ? (
            //     <span className="text-xs text-green-400">✓</span>
            //   ) : (
            //     <span className="text-xs text-yellow-400">⏳</span>
            //   )}
            // </button>
            <button
              key={s._id}
              onClick={() => loadSurah(s._id)}
              className={`relative w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition
    ${
      selectedSurahId === s._id
        ? "bg-emerald-500/20 text-emerald-400"
        : "hover:bg-white/5"
    }`}
            >

              {!s.isCompleted && (
                <span className="absolute left-0 top-0 h-full w-1 bg-red-500 rounded-l-lg" />
                // <span className="w-2 h-2 rounded-full bg-red-500 mr-2" />
              )}

              <span className={`${!s.isCompleted ? "text-red-300" : ""}`}>
                {s.number}. {s.englishName}
              </span>

              {s.isCompleted ? (
                <span className="text-xs text-green-400">✓</span>
              ) : (
                <span className="w-2 h-2 rounded-full bg-red-500 mr-2" />

                // <span className="text-xs text-red-400">Incomplete</span>
              )}
            </button>
          ))}
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto pr-4">
        {!surah && !loading && (
          <p className="text-gray-400 mt-20 text-center">
            Select a surah to start editing tafsir
          </p>
        )}

        {loading && (
          <p className="text-gray-400 mt-20 text-center">Loading tafsir…</p>
        )}

        {surah && (
          <>
            <div className="mb-10">
              <h2 className="text-2xl font-semibold mb-2">{surah.name}</h2>

              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-400 mb-1">
                  <span>
                    Completed {completedAyahs} / {totalAyahs} ayahs
                  </span>
                  <span className="text-emerald-400 font-medium">
                    {progressPercent}%
                  </span>
                </div>

                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>


              <div className="mb-8 flex justify-end">
                {surah.isCompleted ? (
                  <span className="text-sm px-4 py-2 rounded-full bg-green-500/20 text-green-400">
                    ✓ Surah Completed
                  </span>
                ) : (
                  <button
                    disabled={progressPercent !== 100}
                    onClick={async () => {
                      try {
                        await markSurahCompleted(surah._id);
                        alert("Surah marked as completed");
                        loadSurah(selectedSurahId);
                      } catch (err) {
                        alert("All ayahs must be completed before submission");
                      }
                    }}
                    className={`px-6 py-2 rounded-xl text-sm font-medium transition
        ${
          progressPercent === 100
            ? "bg-emerald-500 hover:bg-emerald-600"
            : "bg-gray-600 cursor-not-allowed"
        }`}
                  >
                    Mark Surah as Completed
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-14">
              {surah.ayahs.map((a, index) => {
                const ayahCompleted =
                  a.explanation?.trim() && a.shortMeaning?.length > 0;

                return (
                  <div
                    key={a._id}
                    className="border border-white/10 rounded-2xl p-6"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400">
                        Ayah {index + 1}
                      </span>

                      {ayahCompleted ? (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400">
                          Completed
                        </span>
                      ) : (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400">
                          Pending
                        </span>
                      )}
                    </div>

                    <p className="text-2xl text-right leading-loose mb-6">
                      {a.ayah}
                    </p>

                    {a.shortMeaning?.length > 0 && (
                      <ul className="list-disc pl-5 text-sm text-gray-300 mb-4">
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

                    {a.explanation && (
                      <p className="text-sm text-gray-400 mb-4">
                        {a.explanation}
                      </p>
                    )}

                    {editingAyahId === a._id ? (
                      <>
                        <textarea
                          rows={4}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 mb-3"
                          value={explanationText}
                          onChange={(e) => setExplanationText(e.target.value)}
                        />
                        <div className="flex gap-3">
                          <button
                            onClick={() => saveExplanation(a._id)}
                            className="px-4 py-2 rounded bg-emerald-500"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingAyahId(null)}
                            className="px-4 py-2 rounded border border-white/20"
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingAyahId(a._id);
                          setExplanationText(a.explanation || "");
                        }}
                        className="text-sm px-4 py-2 rounded border border-white/20 hover:bg-white/5 mb-4"
                      >
                        Edit Explanation
                      </button>
                    )}

                    <div className="flex gap-3 mt-4">
                      <input
                        className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2"
                        placeholder="Add short meaning"
                        value={shortMeaningMap[a._id] || ""}
                        onChange={(e) =>
                          setShortMeaningMap({
                            ...shortMeaningMap,
                            [a._id]: e.target.value,
                          })
                        }
                      />
                      <button
                        onClick={() => saveShortMeaning(a._id)}
                        className="px-4 py-2 rounded bg-emerald-500"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminTafser;
