import { Routes, Route } from "react-router";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
