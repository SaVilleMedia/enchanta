import { RouterProvider } from "react-router";
import "./App.scss";
import Routes from "./Routes";

function App() {
  return (
    <div className="App">
      <RouterProvider router={Routes} />
    </div>
  );
}

export default App;
