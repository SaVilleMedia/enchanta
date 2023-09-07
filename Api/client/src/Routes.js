import Login from "./components/login/Login";
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Register from "./components/register/Register";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default Routes;
