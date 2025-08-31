import { useLocation } from "react-router";

import Attribution from "../components/Attribution";

const Main = ({ children }) => {
  const location = useLocation();
  return (
    <main style={{ height: "100dvh", overflow: "hidden" }}>
      {children}
      {location.pathname === "/" ? <Attribution /> : null}
    </main>
  );
};

export default Main;
