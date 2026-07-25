import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createTafserAhsanulKawul,
  updateTafserAhsanulKawul,
  fetchAdminTafserAhsanulKawul,
} from "../../api/tafserAhsanulKawul.api.js";

const AdminTafserAhsanulKawulForm = () => {
  const { id } = useParams(); // edit mode if exists
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    url: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const loadTafsir = async () => {
      try {
        const res = await fetchAdminTafserAhsanulKawul(id);
        setForm({
          title: res.data.data.title,
          url: res.data.data.url,
        });
      } catch {
        alert("Failed to load Tafser Ahsanul qaul");
      }
    };

    loadTafsir();
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        await updateTafserAhsanulKawul(id, form);
      } else {
        await createTafserAhsanulKawul(form);
      }
      navigate("/admin/tafser-ahsanul-qaul");
    } catch {
      alert("Failed to save Tafser Ahsanul qaul");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">
        {id ? "Edit Tafser Ahsanul qaul" : "Add New Tafser Ahsanul qaul"}
      </h1>

      <form onSubmit={submit} className="space-y-6">

        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Tafsir Title *
          </label>
          <input
            required
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            placeholder="e.g., Tafser Surah Al-Fatihah"
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
              ? "Update Tafsir"
              : "Add Tafsir"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/tafser-ahsanul-qaul")}
            className="px-8 py-3 rounded-xl border border-white/20 hover:bg-white/5"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminTafserAhsanulKawulForm;