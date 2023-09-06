import "./App.scss";
import Login from "./components/login/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Register from "./components/register/Register";

const router = createBrowserRouter([
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

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
