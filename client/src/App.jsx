import { Routes, Route } from "react-router";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Main from "./pages/Main";
import Reset from "./pages/Reset";
import Forgotten from "./pages/Forgotten";

import "./App.css";

function App() {
  return (
    <Main>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/forgot_password" element={<Forgotten />} />
        <Route path="/reset_password" element={<Reset />} />
      </Routes>
    </Main>
  );
}

export default App;
