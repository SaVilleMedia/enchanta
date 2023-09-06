import { Button } from "primereact/button";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router";
import Loading from "../shared/loading/Loading";
import { FormErrors } from "../shared/form-errors/FormErrors";

export default function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState([]);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleRegisteration = async (data) => {
    setLoading(true);
    setFormErrors([]);
    try {
      const response = await axios.post("/api/users", data);

      if (response) {
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
        {loading ? <Loading /> : null}
        <h1 className="text-center">Register for Enchanta</h1>
        <form
          className="w-full"
          onSubmit={handleSubmit((data) => {
            handleRegisteration(data);
          })}
        >
          {formErrors.length > 0 ? <FormErrors errors={formErrors} /> : null}
          <div className="flex flex-column gap-2">
            {/* name */}
            <label htmlFor="name">Name</label>
            <InputText
              {...register("name", { required: "Name is required" })}
              aria-describedby="name-help"
            />
            {errors.name?.message ? (
              <Message severity="error" text={errors.name?.message} />
            ) : null}

            {/* username */}
            <label htmlFor="username">User Name</label>
            <InputText
              {...register("username", { required: "username is required" })}
              aria-describedby="username-help"
            />
            {errors.username?.message ? (
              <Message severity="error" text={errors.username?.message} />
            ) : null}

            {/* email */}
            <label htmlFor="email">Email</label>
            <InputText
              {...register("email", { required: "Email is required" })}
              aria-describedby="email-help"
            />
            {errors.email?.message ? (
              <Message severity="error" text={errors.email?.message} />
            ) : null}

            {/* password */}
            <label htmlFor="password">Password</label>
            <InputText
              type="password"
              {...register("password", { required: "Password is required" })}
              aria-describedby="password-help"
            />
            {errors.password?.message ? (
              <Message severity="error" text={errors.password?.message} />
            ) : null}

            {/* confirm password */}
            <label htmlFor="confirmPassword">Confirm Password</label>
            <InputText
              type="password"
              {...register("confirmPassword", {
                required: true,
                validate: (val) => {
                  if (watch("password") !== val) {
                    return "Your passwords do no match";
                  }
                },
              })}
              aria-describedby="passwordConfirm-help"
            />
            {errors.confirmPassword?.message ? (
              <Message
                severity="error"
                text={errors.confirmPassword?.message}
              />
            ) : null}
          </div>
          <Button label="Register" type="submit" className="mt-3 w-full" />
          <Button
            label="Back to login"
            severity="secondary"
            onClick={handleBackToLogin}
            className="mt-3 w-full"
          />
        </form>
      </div>
    </div>
  );
}
