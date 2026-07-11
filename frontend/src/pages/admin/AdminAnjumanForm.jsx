import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createAnjuman,
  updateAnjuman,
  fetchAdminAnjuma,
} from "../../api/adminAnjuman.api.js";

const AdminAnjumanForm = () => {
  const { id } = useParams(); // edit mode if exists
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    url: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const loadAnjuman = async () => {
      try {
        const res = await fetchAdminAnjuma(id);
        setForm({
          title: res.data.data.title,
          url: res.data.data.url,
        });
      } catch {
        alert("Failed to load anjuman");
      }
    };

    loadAnjuman();
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        await updateAnjuman(id, form);
      } else {
        await createAnjuman(form);
      }
      navigate("/admin/anjuman");
    } catch {
      alert("Failed to save anjuman");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">
        {id ? "Edit Anjuman" : "Add New Anjuman"}
      </h1>

      <form onSubmit={submit} className="space-y-6">

        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Anjuman Title *
          </label>
          <input
            required
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Google Drive URL *
          </label>
          <input
            required
            type="url"
            placeholder="https://drive.google.com/..."
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3"
            value={form.url}
            onChange={(e) =>
              setForm({ ...form, url: e.target.value })
            }
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 transition font-medium"
          >
            {loading
              ? "Saving..."
              : id
              ? "Update Anjuman"
              : "Add Anjuman"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/anjuman")}
            className="px-8 py-3 rounded-xl border border-white/20 hover:bg-white/5"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminAnjumanForm;