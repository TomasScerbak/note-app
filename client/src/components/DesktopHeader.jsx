import classes from "./DesktopHeader.module.css";

import SearchInput from "../components/UI/SearchInput";
import DesktopSettingButton from "./DesktopSettingButton";

const DesktopHeader = ({
  searchTerm,
  headerText,
  handleSearchChange,
  setActiveNoteId,
  message,
  theme,
  handleSettingClicked,
}) => {
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
        <div className={classes.header__right__container}>
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
          <DesktopSettingButton theme={theme} handleSettingClicked={handleSettingClicked} />
        </div>
      </header>
    </>
  );
};

export default DesktopHeader;
