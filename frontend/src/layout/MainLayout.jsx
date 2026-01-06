import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const MainLayout = () => {
  return (
    <div className="bg-[#020617] text-white min-h-screen">
      <Navbar />

      <main className="pt-24">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
