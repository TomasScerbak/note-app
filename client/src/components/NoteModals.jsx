import CallToActionModal from "../components/modals/CallToActionModal";
import TrashImage from "../assets/icon-delete-white.svg";
import TrashImageDark from "../assets/icon-delete-dark-grey.svg";
import ArchiveImage from "../assets/icon-archive-white.svg";
import ArchiveImageDark from "../assets/icon-archive-dark-grey.svg";
import { useTheme } from "../contexts/themeContext";

const NoteModals = ({
  showDeleteModal,
  setShowDeleteModal,
  showArchiveModal,
  setShowArchiveModal,
  confirmDeleteNote,
  onToggleArchive,
  isArchived,
}) => {
  const { theme } = useTheme();

  return (
    <>
      {showDeleteModal && (
        <CallToActionModal
          header="Delete Note"
          message="Are you sure you want to permanently delete this note? This action cannot be undone."
          btnsArr={[
            { title: "Cancel", variant: "cancel", onClick: () => setShowDeleteModal(false) },
            {
              title: "Delete Note",
              variant: "delete",
              onClick: () => {
                confirmDeleteNote();
                setShowDeleteModal(false);
              },
            },
          ]}
          image={theme === "light" ? TrashImageDark : TrashImage}
        />
      )}
      {showArchiveModal && (
        <CallToActionModal
          header={isArchived ? "Please Note" : "Archive Note"}
          message={
            isArchived
              ? "Note will be removed from Archive Note Section. You can archive this note back anytime."
              : "Are you sure you want to archive this note? You can find it in the Archive notes section and restore it anytime."
          }
          btnsArr={[
            { title: "Cancel", variant: "cancel", onClick: () => setShowArchiveModal(false) },
            {
              title: isArchived ? "Unarchive" : "Archive Note",
              variant: "archive",
              onClick: () => {
                onToggleArchive();
                setShowArchiveModal(false);
              },
            },
          ]}
          image={theme === "light" ? ArchiveImageDark : ArchiveImage}
        />
      )}
    </>
  );
};

export default NoteModals;
