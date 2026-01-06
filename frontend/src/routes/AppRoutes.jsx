import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import MainLayout from "../layout/MainLayout.jsx";
import AuthLayout from "../layout/AuthLayout.jsx";
import UserLogin from "../pages/auth/UserLogin.jsx";
import UserSignup from "../pages/auth/UserSignup.jsx";
import AdminLogin from "../pages/auth/AdminLogin.jsx";
import Tafser from "../pages/Tafser.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/tafser" element={<Tafser />} />
      </Route>


      <Route element={<AuthLayout />}>
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;