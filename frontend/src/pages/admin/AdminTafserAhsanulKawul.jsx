import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  fetchAdminTafserAhsanulKawulList,
  deleteTafserAhsanulKawul,
} from "../../api/tafserAhsanulKawul.api.js";

const AdminTafserAhsanulKawul = () => {
  const [tafsirs, setTafsirs] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTafsirs = async () => {
    try {
      const res = await fetchAdminTafserAhsanulKawulList();
      setTafsirs(res.data.data || []);
    } catch {
      alert("Failed to load Tafser Ahsanul Kawul");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTafsirs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this Tafser Ahsanul Kawul permanently?")) return;
    try {
      await deleteTafserAhsanulKawul(id);
      loadTafsirs();
    } catch {
      alert("Failed to delete Tafser Ahsanul Kawul");
    }
  };

  if (loading) {
    return <p className="text-gray-400">Loading Tafser Ahsanul Kawul...</p>;
  }

  return (
    <div>

      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold">Tafser Ahsanul Kawul</h1>

        <Link
          to="/admin/tafser-ahsanul-kawul/new"
          className="px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 transition"
        >
          + Add Tafsir
        </Link>
      </div>

      {tafsirs.length === 0 && (
        <p className="text-gray-400">No Tafser Ahsanul Kawul added yet.</p>
      )}

      <div className="space-y-4">
        {tafsirs.map((t, index) => (
          <div
            key={t._id}
            className="flex flex-col md:flex-row md:items-center justify-between 
            border border-white/10 rounded-xl px-6 py-4 gap-4"
          >
            <div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500 font-mono">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h2 className="font-medium text-base md:text-lg">
                  {t.title}
                </h2>
              </div>

              <p className="text-xs text-gray-200 mt-1">
                Added on {new Date(t.createdAt).toLocaleDateString()} •  {"  "} 
                {t.viewC || 0} views
              </p>
            </div>


            <div className="flex gap-3">
              <Link
                to={`/admin/tafser-ahsanul-kawul/edit/${t._id}`}
                className="px-4 py-1.5 text-sm rounded border border-white/20 hover:bg-white/5 transition"
              >
                Edit
              </Link>

              <button
                onClick={() => handleDelete(t._id)}
                className="px-4 py-1.5 text-sm rounded border border-red-400/40 text-red-400 hover:bg-red-400/10 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AdminTafserAhsanulKawul;