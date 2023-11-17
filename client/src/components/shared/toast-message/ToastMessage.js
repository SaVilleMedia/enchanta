import React, { useRef } from "react";
import { Toast } from "primereact/toast";
import { useMountEffect } from "primereact/hooks";

export default function ToastMessage({ message, severity }) {
  const toast = useRef(null);

  useMountEffect(() => {
    toast.current.show({
      severity: severity ?? "success",
      summary: severity === "error" ? "Error" : "Success",
      detail: message ?? "",
    });
  }, []);

  return (
    <div className="card flex justify-content-center">
      <Toast ref={toast} />
    </div>
  );
}
