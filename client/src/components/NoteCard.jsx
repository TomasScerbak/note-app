import { useNavigate } from "react-router";
import Tag from "./UI/Tag";

import classes from "./NoteCard.module.css";

const NoteCard = ({ id, noteHeading, tags, lastEdited }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/home/note/${id}`);
  };

  return (
    <div className={classes.noteCard} onClick={handleCardClick} role="button" tabIndex={0}>
      <h3 className={classes.note__card_header}>{noteHeading}</h3>
      <div className={classes.tags__container}>
        {tags && tags.length ? tags.map((tag, index) => <Tag key={index} tagLabel={tag} />) : null}
      </div>
      <p className={classes.last__edited}>{lastEdited}</p>
    </div>
  );
};

export default NoteCard;
