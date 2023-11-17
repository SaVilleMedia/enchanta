import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.scss";
import Dashboard from "./components/dashboard/Dashboard";
import Decks from "./components/decks/Decks";
import Landing from "./components/landing/Landing";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import ToastMessage from "./components/shared/toast-message/ToastMessage";
import enchantaStore from "./store";
import PrivateRoutes from "./utils/PrivateRoute";
import setAuthToken from "./utils/setAuthToken";
import "font-awesome/css/font-awesome.min.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Collection from "./components/collection/Collection";

const queryClient = new QueryClient();

function App() {
  const token = enchantaStore((state) => state.authenticated.token);
  const isAuthenticated = enchantaStore(
    (state) => state.authenticated.isAuthenticated
  );
  const error = enchantaStore((state) => state.error);
  const success = enchantaStore((state) => state.success);
  const logoutUser = enchantaStore((state) => state.logoutUser);
  const navigate = useNavigate();

  const items = [
    {
      label: "Home",
      icon: "pi pi-fw pi-home",
      command: () => handleNavbarLinkClick(),
    },
    {
      label: "Collection",
      icon: "pi pi-fw pi-bookmark",
      command: () => handleNavbarLinkClick("collection"),
    },
    {
      label: "Explore",
      icon: "pi pi-fw pi-globe",
      items: [
        {
          label: "Decks",
          icon: "pi pi-fw pi-book",
          command: () => handleNavbarLinkClick("decks"),
        },
      ],
    },
    {
      label: "Dashboard",
      icon: "pi pi-fw pi-desktop",
      command: () => handleNavbarLinkClick("dashboard"),
    },
  ];

  if (token) {
    setAuthToken(token);
  }

  function handleNavbarLinkClick(link = "") {
    navigate(`/${link}`);
  }

  function handleLogoutUser() {
    logoutUser();
    navigate("/");
  }

  function goToLogin() {
    navigate("/login");
  }

  const navbarButton = () => {
    const buttonAction = isAuthenticated ? handleLogoutUser : goToLogin;
    const buttonLabel = isAuthenticated ? "Logout" : "Login/Register";

    return <Button label={buttonLabel} onClick={buttonAction} />;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        {error || success ? (
          <ToastMessage
            message={error || success}
            severity={error ? "error" : "success"}
          />
        ) : null}
        <Menubar
          className="absolute w-full top-0"
          model={items}
          breakpoint="960px"
          start={"Enchanta"}
          end={navbarButton}
        />
        <div className="app-container w-full h-full">
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/collection" element={<Collection />} exact />
            </Route>
            <Route path="/" element={<Landing />} exact />
            <Route path="/decks" element={<Decks />} />
            <Route path="/login" element={<Login />} exact />
            <Route path="/register" element={<Register />} exact />
          </Routes>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
