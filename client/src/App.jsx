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
import TagDetailedList from "./pages/TagDetailedList";
import SettingsDetailedList from "./pages/SettingsDetailedList";

import "./App.css";

function App() {
  return (
    <Main>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />}>
          <Route path="all-notes" element={<AllNotes />} />
          <Route path="create-note" element={<NewNote />} />
          <Route path="note/:id" element={<ViewNotePage />} />
          <Route path="search-notes" element={<Search />} />
          <Route path="archive-notes" element={<Archive />} />
          <Route path="tag-list" element={<TagList />} />
          <Route path="tag-detailed-list/:tag" element={<TagDetailedList />} />
          <Route path="settings" element={<Settings />} />
          <Route path="settings-detailed-list/:setting" element={<SettingsDetailedList />} />
        </Route>
        <Route path="/forgot_password" element={<Forgotten />} />
        <Route path="/reset_password" element={<Reset />} />
      </Routes>
    </Main>
  );
}

export default App;
