import { useEffect, useState } from "react";
import { getKhutbaList, increaseKhutbaView } from "../api/khutba.api";

const Khutba = () => {
  const [khutbas, setKhutbas] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchKhutbas = async () => {
    try {
      const res = await getKhutbaList();
      setKhutbas(res.data.data || []);
    } catch {
      console.error("Failed to fetch khutbas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKhutbas();
  }, []);

  const handleView = async (id, url) => {
    try {
      await increaseKhutbaView(id);
      window.open(url, "_blank");

      // update UI count instantly
      setKhutbas((prev) =>
        prev.map((k) =>
          k._id === id ? { ...k, viewC: k.viewC + 1 } : k
        )
      );
    } catch {
      alert("Failed to register view");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-24">

      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Khutbas</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Friday sermons and reminders intended to strengthen faith,
          provide guidance, and inspire reflection.
        </p>
      </div>

      {loading && (
        <div className="text-center text-gray-400">
          Loading khutbas…
        </div>
      )}

      {!loading && khutbas.length === 0 && (
        <div className="text-center text-gray-400">
          No khutbas have been published yet.
        </div>
      )}

      <ul className="space-y-5">
        {khutbas.map((k, index) => (
          <li
            key={k._id}
            className="group flex items-center justify-between 
            border border-white/10 rounded-2xl 
            px-6 py-5 hover:border-emerald-400/40 
            transition"
          >

            <div className="flex items-center gap-6">
              <span className="text-sm text-gray-500 font-mono">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div>
                <h2 className="text-base md:text-lg font-medium 
                group-hover:text-emerald-400 transition">
                  {k.title}
                </h2>

                <p className="text-xs text-gray-300 mt-1 flex items-center gap-2">
                  {k.viewC || 0} views
                </p>
              </div>
            </div>

            <button
              onClick={() => handleView(k._id, k.url)}
              className="px-5 py-2 rounded-full text-sm font-medium
              border border-white/20 hover:bg-white/5 
              hover:border-emerald-400/40 transition"
            >
              View
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Khutba;
