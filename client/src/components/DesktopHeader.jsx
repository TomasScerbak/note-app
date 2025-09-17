import classes from "./DesktopHeader.module.css";

import SearchInput from "../components/UI/SearchInput";

const DesktopHeader = ({ searchTerm, headerText, handleSearchChange, setActiveNoteId, message }) => {
  return (
    <>
      <header className={classes.top__header}>
        {searchTerm.length ? (
          <h1 style={{ color: "var(--app-secondary-text)" }}>
            Showing results for:
            <q style={{ color: "var(--app-primary-text)", marginLeft: "1rem" }}>{searchTerm}</q>
          </h1>
        ) : (
          <h1>{headerText}</h1>
        )}
        <SearchInput
          onChange={(e) => {
            handleSearchChange(e.target.value);
            setActiveNoteId("");
          }}
          message={message}
          placeholder="Search by title, content, or tags..."
          isDesktop={true}
          value={searchTerm ?? ""}
        />
      </header>
    </>
  );
};

export default DesktopHeader;
