import classes from "./InputMessage.module.css";

const InputMessage = ({ text, level }) => {
  let msgColor;

  switch (level) {
    case "info":
      msgColor = "message--info";
      break;
    case "critical":
      msgColor = "message--critical";
      break;
    default:
      msgColor = "";
  }

  return (
    <div className={classes.message__container}>
      <svg
        className={classes.message__image}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke={level === "critical" ? "#FB3748" : "#99A0AE"}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0ZM12.006 15.693v-4.3M12 8.355v-.063"
        />
      </svg>
      <p className={`${classes.message__text} ${classes[msgColor]}`}>{text}</p>
    </div>
  );
};

export default InputMessage;
