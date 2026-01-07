const AdminDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="border border-white/10 rounded-xl p-6">
          <p className="text-sm text-gray-400">Articles</p>
          <h2 className="text-2xl font-semibold mt-2">—</h2>
        </div>

        <div className="border border-white/10 rounded-xl p-6">
          <p className="text-sm text-gray-400">Khutbas</p>
          <h2 className="text-2xl font-semibold mt-2">—</h2>
        </div>

        <div className="border border-white/10 rounded-xl p-6">
          <p className="text-sm text-gray-400">Surahs</p>
          <h2 className="text-2xl font-semibold mt-2">—</h2>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
