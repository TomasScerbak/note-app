import { useParams } from "react-router";
import { useGetNoteById } from "../hooks/queries/useGetNoteById";
import Loader from "../components/UI/Loader";
import Modal from "../components/modals/Modal";

import classes from "./ViewNotePage.module.css";

const ViewNotePage = () => {
  const { id } = useParams();
  console.log("Viewing Note ID:", id);
  const { noteData, isLoading, isError, error } = useGetNoteById(id);

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <Modal
        header="Please Note"
        message={`Couldn't load the note. ${error?.message || "Please try again later."}`}
      />
    );

  console.log("noteData:", noteData);

  return (
    <div className={classes.view_note}>
      <h2>Viewing Note</h2>
    </div>
  );
};

export default ViewNotePage;
