import { useNavigate } from "react-router";

import classes from "./NoteCard.module.css";

import Tag from "./UI/Tag";

const NoteCard = ({ id, noteHeading, tags, lastEdited, isDesktop, onCardClick, isActive }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (isDesktop) {
      onCardClick(id);
    } else {
      navigate(`/home/note/${id}`); // Navigate only if not desktop
    }
  };

  const cardClassName = `${classes.noteCard} ${isActive && isDesktop ? classes.active : ""}`;
  return (
    <div className={cardClassName} onClick={handleCardClick} role="button" tabIndex={0}>
      <h3 className={classes.note__card_header}>{noteHeading}</h3>
      <div className={classes.tags__container}>
        {tags && tags.length ? tags.map((tag, index) => <Tag key={index} tagLabel={tag} />) : null}
      </div>
      <p className={classes.last__edited}>{lastEdited}</p>
    </div>
  );
};

export default NoteCard;
