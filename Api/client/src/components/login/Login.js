import { useState } from "react";
import { Button } from "primereact/button";
import "./Login.scss";
import axios from "axios";
import { useNavigate } from "react-router";
import { FormCreator } from "../shared/form-creator/FormCreator";
import { LOGIN_FORM_FIELDS } from "./LoginFormFields";

export default function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState([]);

  const handleLogin = async (data) => {
    setLoading(true);
    setFormErrors([]);
    try {
      const response = await axios.post("/api/auth", data);

      if (response) {
        navigate("/dashboard");
      }
    } catch (err) {
      const responseErrors = err.response.data.errors;
      setFormErrors(responseErrors);
      setLoading(false);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <div className="h-screen flex justify-content-center align-items-center">
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
