import {
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.scss";
import Login from "./components/login/Login";
import PrivateRoutes from "./utils/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Register from "./components/register/Register";
import ToastMessage from "./components/shared/toast-message/ToastMessage";
import enchantaStore from "./store";
import setAuthToken from "./utils/setAuthToken";
import { useEffect } from "react";

function App() {
  const token = enchantaStore((state) => state.authenticated.token);
  const error = enchantaStore((state) => state.error);
  const success = enchantaStore((state) => state.success);
  const loginUser = enchantaStore((state) => state.loginUser);
  const navigate = useNavigate();

  if (token) {
    setAuthToken(token);
  }

  useEffect(() => {
    if (token) {
      loginUser(token);
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="App">
      {error || success ? (
        <ToastMessage
          message={error || success}
          severity={error ? "error" : "success"}
        />
      ) : null}
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/login" element={<Login />} exact />
        <Route path="/register" element={<Register />} exact />
      </Routes>
    </div>
  );
}

export default App;
