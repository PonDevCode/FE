import { Outlet } from "react-router-dom";
import Header from "./components/client/Header/menu";
function App() {
  return (
        <>
          <Header />
          <Outlet />
        </>
  );
}

export default App
