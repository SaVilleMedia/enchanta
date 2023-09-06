import { ProgressSpinner } from "primereact/progressspinner";
import "./Loading.scss";

export default function Loading() {
  return (
    <div className="loading card flex justify-content-center align-items-center absolute w-full h-full">
      <ProgressSpinner />
    </div>
  );
}
