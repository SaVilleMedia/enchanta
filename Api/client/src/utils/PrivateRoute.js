import { Outlet, Navigate } from "react-router-dom";
import enchantaStore from "../store";

const PrivateRoutes = () => {
  const isAuthenticated = enchantaStore(
    (state) => state.authenticated.isAuthenticated
  );
  return isAuthenticated ? <Outlet /> : <Navigate to="/login/" />;
};

export default PrivateRoutes;
