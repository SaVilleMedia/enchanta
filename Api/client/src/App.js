import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.scss";
import Login from "./components/login/Login";
import PrivateRoutes from "./utils/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Register from "./components/register/Register";
import ToastMessage from "./components/shared/toast-message/ToastMessage";
import enchantaStore from "./store";

function App() {
  const error = enchantaStore((state) => state.error);
  const success = enchantaStore((state) => state.success);

  return (
    <div className="App">
      {error || success ? (
        <ToastMessage
          message={error || success}
          severity={error ? "error" : "success"}
        />
      ) : null}
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/login" element={<Login />} exact />
          <Route path="/register" element={<Register />} exact />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
