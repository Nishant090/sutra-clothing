import { Routes, Route } from "react-router";
import Login from "../pages/Login.tsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
