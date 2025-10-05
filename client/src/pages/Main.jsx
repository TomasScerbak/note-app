import { useLocation } from "react-router";

import Attribution from "../components/Attribution";

const Main = ({ children }) => {
  const location = useLocation();
  return (
    <main style={{ height: "100dvh", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      {children}
      {location.pathname === "/" || location.pathname === "/signup" ? <Attribution /> : null}
    </main>
  );
};

export default Main;
