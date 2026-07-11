import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  fetchAdminAnjumans,
  removeAnjuman,
} from "../../api/adminAnjuman.api.js";

const AdminAnjuman = () => {
  const [anjumans, setAnjumans] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAnjumans = async () => {
    try {
      const res = await fetchAdminAnjumans();
      setAnjumans(res.data.data || []);
    } catch {
      alert("Failed to load anjuman list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnjumans();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this anjuman permanently?")) return;
    try {
      await removeAnjuman(id);
      loadAnjumans();
    } catch {
      alert("Failed to delete anjuman");
    }
  };

  if (loading) {
    return <p className="text-gray-400">Loading anjuman...</p>;
  }

  return (
    <div>

      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold">Anjuman</h1>

        <Link
          to="/admin/anjuman/new"
          className="px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 transition"
        >
          + Add Anjuman
        </Link>
      </div>

      {anjumans.length === 0 && (
        <p className="text-gray-400">No anjuman added yet.</p>
      )}

      <div className="space-y-4">
        {anjumans.map((a, index) => (
          <div
            key={a._id}
            className="flex flex-col md:flex-row md:items-center justify-between 
            border border-white/10 rounded-xl px-6 py-4 gap-4"
          >
            <div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500 font-mono">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h2 className="font-medium text-base md:text-lg">
                  {a.title}
                </h2>
              </div>

              <p className="text-xs text-gray-200 mt-1">
                Added on {new Date(a.createdAt).toLocaleDateString()} •  {"  "} 
                {a.viewC || 0} views
              </p>
            </div>

            <div className="flex gap-3">
              <Link
                to={`/admin/anjuman/edit/${a._id}`}
                className="px-4 py-1.5 text-sm rounded border border-white/20 hover:bg-white/5 transition"
              >
                Edit
              </Link>

              <button
                onClick={() => handleDelete(a._id)}
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

export default AdminAnjuman;