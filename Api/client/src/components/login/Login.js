import { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";
import { useForm } from "react-hook-form";
import "./Login.scss";
import axios from "axios";
import { useNavigate } from "react-router";
import Loading from "../shared/loading/Loading";
import { FormErrors } from "../shared/form-errors/FormErrors";

export default function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

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
        {loading ? <Loading /> : null}
        <h1 className="text-center">Enchanta</h1>
        <form
          className="w-full"
          onSubmit={handleSubmit((data) => {
            handleLogin(data);
          })}
        >
          {formErrors.length > 0 ? <FormErrors errors={formErrors} /> : null}
          <div className="flex flex-column gap-2">
            <label htmlFor="email">Email</label>
            <InputText
              {...register("email", { required: "Email is required" })}
              aria-describedby="email-help"
            />
            {errors.email?.message ? (
              <Message severity="error" text={errors.email?.message} />
            ) : null}

            <label htmlFor="password">Password</label>
            <InputText
              type="password"
              {...register("password", { required: "Password is required" })}
              aria-describedby="password-help"
            />
            {errors.password?.message ? (
              <Message severity="error" text={errors.password?.message} />
            ) : null}
          </div>
          <Button label="Login" type="submit" className="mt-3 w-full" />
          <Button
            label="Register"
            className="mt-3 w-full"
            severity="secondary"
            onClick={handleRegister}
          />
        </form>
      </div>
    </div>
  );
}