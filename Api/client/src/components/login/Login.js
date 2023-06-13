import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";
import { useForm } from "react-hook-form";

import "./Login.scss";

export default function Login() {
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

  const handleLogin = (data) => {
    console.log(data);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Re rout to register");
  };

  return (
    <div
      className="login flex flex-column justify-content-center 
      align-items-center relative w-6 shadow-7 p-5"
    >
      <h1 className="text-center">Enchanta</h1>
      <form
        className="w-full"
        onSubmit={handleSubmit((data) => {
          handleLogin(data);
        })}
      >
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
  );
}
