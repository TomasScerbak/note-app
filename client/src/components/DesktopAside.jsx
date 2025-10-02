import { useGetNoteById } from "../hooks/queries/useGetNoteById";

import classes from "./DesktopAside.module.css";

import Button from "./UI/Button";

const DesktopAside = ({ activeNoteId, btnActionsData, getBtnImages, theme, onDeleteNote, onArchiveNote }) => {
  const { noteData } = useGetNoteById(activeNoteId);

  return (
    <aside className={classes.right__sidebar}>
      {activeNoteId &&
        btnActionsData.map((btn) => {
          const { img } = getBtnImages(btn, theme);
          return (
            <Button
              key={btn.id}
              active={btn.active}
              src={img}
              secondarySrc={btn.img2}
              type={btn.type}
              hasImage={true}
              size={btn.size}
              variant={btn.variant}
              title={btn.title === "Archive Note" && noteData?.is_archived ? "Unarchive Note" : btn.title}
              btnImageClass="image-left"
              btnSecondaryImageClass="image-right"
              onClick={() => (btn.title === "Delete Note" ? onDeleteNote() : onArchiveNote())}
            />
          );
        })}
    </aside>
  );
};

export default DesktopAside;
