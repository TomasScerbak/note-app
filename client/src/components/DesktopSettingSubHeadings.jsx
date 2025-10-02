import classes from "./DesktopSettingSubHeadings.module.css";

const DesktopSettingSubHeadings = ({ heading, subheading }) => {
  return (
    <div className={classes.subheadings_container}>
      <h1>{heading}</h1>
      <p>{subheading}</p>
    </div>
  );
};

export default DesktopSettingSubHeadings;
