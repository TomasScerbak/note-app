import classes from "./ArchiveHeader.module.css";

const ArchiveHeader = () => {
  return (
    <div>
      <h1 className={classes.archive__header}>Archived Notes</h1>
      <p className={classes.archive__subheader}>
        All your archived notes are stored here. You can restore or delete them anytime.
      </p>
    </div>
  );
};

export default ArchiveHeader;
