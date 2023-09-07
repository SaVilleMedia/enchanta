import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";
import { useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { FormErrors } from "../form-errors/FormErrors";
import Loading from "../loading/Loading";

export const FormCreator = ({
  fields,
  submitHandler,
  title,
  submitLabel,
  loading,
  errs,
}) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm(() => {
    const defaultValues = {};
    fields.forEach((field) => {
      defaultValues[field.name] = field.defaultValue;
    });
    return defaultValues;
  });

  return (
    <div className="form-creator w-full">
      {loading ? <Loading /> : null}
      <h1>{title}</h1>
      <form
        onSubmit={handleSubmit((data) => {
          submitHandler(data);
        })}
      >
        {errs.length > 0 ? <FormErrors errors={errs} /> : null}
        {fields.map((field) => {
          if (field.type === "text") {
            return (
              <div key={field.name} className="flex flex-column gap-2 mb-2">
                <label htmlFor={field.name}>
                  {field.label} {field.validation.required ? "*" : ""}
                </label>
                <InputText
                  {...register(field.name, {
                    required: field.validation.required,
                    validate: (val) => {
                      if (field.validateAgainst) {
                        if (watch(field.validateAgainst) !== val) {
                          return `Your ${field.label}s do not match`;
                        }
                      }
                    },
                  })}
                  aria-describedby={`${field.name}-help`}
                />
                {errors[field.name]?.message ? (
                  <Message
                    severity="error"
                    text={errors[field.name]?.message}
                  />
                ) : null}
              </div>
            );
          }
          if (field.type === "email") {
            return (
              <div key={field.name} className="flex flex-column gap-2 mb-2">
                {field.label} {field.validation.required ? "*" : ""}
                <InputText
                  type="text"
                  {...register(field.name, {
                    required: field.validation.required,
                    validate: (val) => {
                      if (field.validateAgainst) {
                        if (watch(field.validateAgainst) !== val) {
                          return `Your ${field.label}s do not match`;
                        }
                      }
                    },
                  })}
                  aria-describedby={`${field.name}-help`}
                />
                {errors[field.name]?.message ? (
                  <Message
                    severity="error"
                    text={errors[field.name]?.message}
                  />
                ) : null}
              </div>
            );
          }
          if (field.type === "password") {
            return (
              <div key={field.name} className="flex flex-column gap-2 mb-2">
                {field.label} {field.validation.required ? "*" : ""}
                <InputText
                  type="password"
                  {...register(field.name, {
                    required: field.validation.required,
                    validate: (val) => {
                      if (field.validateAgainst) {
                        if (watch(field.validateAgainst) !== val) {
                          return `Your ${field.label}s do not match`;
                        }
                      }
                    },
                  })}
                  aria-describedby={`${field.name}-help`}
                />
                {errors[field.name]?.message ? (
                  <Message
                    severity="error"
                    text={errors[field.name]?.message}
                  />
                ) : null}
              </div>
            );
          }

          return null;
        })}
        <Button
          label={submitLabel ?? "Submit"}
          type="submit"
          className="mt-3 w-full"
        />
      </form>
    </div>
  );
};
