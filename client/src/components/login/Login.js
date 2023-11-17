import { useState } from "react";
import { Button } from "primereact/button";
import "./Login.scss";
import axios from "axios";
import { useNavigate } from "react-router";
import { FormCreator } from "../shared/form-creator/FormCreator";
import { LOGIN_FORM_FIELDS } from "./LoginFormFields";
import enchantaStore from "../../store";

export default function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState([]);
  const setToken = enchantaStore((state) => state.setToken);
  const loginUser = enchantaStore((state) => state.loginUser);
  const clearErrors = enchantaStore((state) => state.clearErrors);
  const setUser = enchantaStore((state) => state.setUser);
  const setError = enchantaStore((state) => state.setError);

  const handleLogin = async (data) => {
    setLoading(true);
    setFormErrors([]);
    try {
      const response = await axios.post("/api/auth", data);
      const token = response.data.token;
      setToken(response.data.token);
      loginUser(token)
        .then((res) => {
          login();
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setError("An error has occured");
        });
    } catch (err) {
      const responseErrors = err.response.data.errors;
      setFormErrors(responseErrors);
      setLoading(false);
    }
  };

  function login() {
    clearErrors();
    loginUser()
      .then((res) => {
        if (res) {
          if (res.status === 200 || res.status === 304) {
            setUser(res.data);
            navigate("/dashboard");
          }
        }
      })
      .catch((err) => {
        console.log("error", err);
        setError("An error has occured");
      });
  }

  const handleRegister = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <div className="w-full h-screen absolute flex flex justify-content-center align-items-center top-0">
      <div
        className="login flex flex-column justify-content-center 
        align-items-center w-6 shadow-7 p-5"
      >
        <FormCreator
          fields={LOGIN_FORM_FIELDS}
          submitHandler={handleLogin}
          title={"Login to Enchanta"}
          submitLabel={"Login"}
          loading={loading}
          errs={formErrors}
        />
        <Button
          label="Register"
          className="mt-3 w-full"
          severity="secondary"
          onClick={handleRegister}
        />
      </div>
    </div>
  );
}
