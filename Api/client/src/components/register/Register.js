import { Button } from "primereact/button";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { FormCreator } from "../shared/form-creator/FormCreator";
import { REGISTER_FORM_FIELDS } from "./RegisterFormFields";
import enchantaStore from "../../store";

export default function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState([]);
  const setToken = enchantaStore((state) => state.setToken);
  const setSuccess = enchantaStore((state) => state.setSuccess);

  const handleRegisteration = async (data) => {
    setLoading(true);
    setFormErrors([]);
    try {
      const response = await axios.post("/api/users", data);

      if (response) {
        setToken(response.data.token);
        setSuccess("User registered successfully");
        navigate("/login");
      }
    } catch (err) {
      const responseErrors = err.response.data.errors;
      setFormErrors(responseErrors);
      setLoading(false);
    }
  };

  const handleBackToLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className="h-screen flex justify-content-center align-items-center">
      <div
        className="login flex flex-column justify-content-center 
        align-items-center w-6 shadow-7 p-5"
      >
        <FormCreator
          fields={REGISTER_FORM_FIELDS}
          submitHandler={handleRegisteration}
          title={"Register for Enchanta"}
          submitLabel={"Register"}
          loading={loading}
          errs={formErrors}
        />
        <Button
          label="Back to login"
          severity="secondary"
          onClick={handleBackToLogin}
          className="mt-3 w-full"
        />
      </div>
    </div>
  );
}
