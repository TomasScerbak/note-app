import Tag from "./UI/Tag";

import classes from "./NoteCard.module.css";

const NoteCard = ({ noteHeading, tags, lastEdited }) => {
  return (
    <div className={classes.noteCard}>
      <h3 className={classes.note__card_header}>{noteHeading}</h3>
      <div className={classes.tags__container}>
        {tags && tags.length ? tags.map((tag, index) => <Tag key={index} tagLabel={tag} />) : null}
      </div>
      <p className={classes.last__edited}>{lastEdited}</p>
    </div>
  );
};

export default NoteCard;
