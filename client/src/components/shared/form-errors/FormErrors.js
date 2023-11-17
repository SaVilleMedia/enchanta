import React, { useRef } from "react";
import { useMountEffect } from "primereact/hooks";
import { Messages } from "primereact/messages";

export const FormErrors = ({ errors }) => {
  const msgs = useRef(null);

  useMountEffect(() => {
    errors?.forEach((error) => {
      msgs.current.show({
        severity: "error",
        detail: error.msg,
        closable: false,
        sticky: true,
      });
    });
  }, []);

  return (
    <div>
      <Messages ref={msgs} />
    </div>
  );
};
