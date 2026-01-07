import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <aside className="w-64 bg-black border-r border-white/10 hidden md:block">
      <div className="p-6 border-b border-white/10">
        <h2 className="text-lg font-semibold text-emerald-400">
          Admin Panel
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          Tajammul Salafi
        </p>
      </div>

      <nav className="p-4 space-y-2 text-sm">
        <NavLink to="/admin/dashboard" className="block px-4 py-2 rounded hover:bg-white/5">
          Dashboard
        </NavLink>
        <NavLink to="/admin/articles" className="block px-4 py-2 rounded hover:bg-white/5">
          Articles
        </NavLink>
        <NavLink to="/admin/khutba" className="block px-4 py-2 rounded hover:bg-white/5">
          Khutba
        </NavLink>
        <NavLink to="/admin/tafser" className="block px-4 py-2 rounded hover:bg-white/5">
          Tafser
        </NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
