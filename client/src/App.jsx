import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <>
    <>
      <div className="app-container sm:grid sm:grid-cols-[250px_1fr]">
        <div className="hidden sm:h-[100vh] sm:block">
          <Header />
        </div>
        <div className="">
          <Outlet />
        </div>
      </div>
    </>
    </>
  );
}

export default App;
