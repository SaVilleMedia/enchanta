export const REGISTER_FORM_FIELDS = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter your name",
    defaultValue: "",
    validation: {
      required: "Name is required",
    },
  },
  {
    name: "username",
    label: "User Name",
    type: "text",
    placeholder: "Enter your username",
    defaultValue: "",
    validation: {
      required: "Username is required",
    },
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
    defaultValue: "",
    validation: {
      required: "Email is required",
    },
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    defaultValue: "",
    validation: {
      required: "Password is required",
    },
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    validatAgainstField: true,
    placeholder: "Confirm your password",
    defaultValue: "",
    validateAgainst: "password",
    validation: {
      required: "Confirm password is required",
    },
  },
];
