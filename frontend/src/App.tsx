import { useEffect } from "react";
import "./App.css";

import AppRoutes from "./routes/AppRoutes";
import { useAuthStore } from "./features/auth/store/auth.store";
const App = () => {
    const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    void checkAuth();
  }, [checkAuth]);
  return <AppRoutes />;
};

export default App;
