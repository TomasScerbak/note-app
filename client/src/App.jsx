import { Routes, Route } from "react-router";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Main from "./pages/Main";
import Reset from "./pages/Reset";
import Forgotten from "./pages/Forgotten";
import NewNote from "./components/NewNote";
import ViewNotePage from "./components/ViewNotePage";
import AllNotes from "./components/AllNotes";
import Search from "./pages/Search";
import Archive from "./pages/Archive";
import TagList from "./pages/TagList";
import Settings from "./pages/Settings";

import "./App.css";

function App() {
  return (
    <Main>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />}>
          <Route path="/home/all-notes" element={<AllNotes />} />
          <Route path="/home/create-note" element={<NewNote />} />
          <Route path="home/note/:id" element={<ViewNotePage />} />
          <Route path="home/search-notes" element={<Search />} />
          <Route path="home/archive-notes" element={<Archive />} />
          <Route path="home/tag-list" element={<TagList />} />
          <Route path="home/settings" element={<Settings />} />
        </Route>
        <Route path="/forgot_password" element={<Forgotten />} />
        <Route path="/reset_password" element={<Reset />} />
      </Routes>
    </Main>
  );
}

export default App;
