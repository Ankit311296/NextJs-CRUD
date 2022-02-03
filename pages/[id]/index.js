import React, { useState } from "react";
import { useRouter } from "next/router";

const Note = ({ note }) => {
  const router = useRouter();
  const noteId = router.query.id;

  const onDelete = () => {
    deleteNote();
  };

  const deleteNote = async () => {
    try {
      const deleted = await fetch(`http://localhost:3000/api/notes/${noteId}`, {
        method: "Delete",
      });
      router.push("/");
    } catch (error) {}
  };

  return (
    <div className="container">
      <h1>{note.title}</h1>
      <h5>{note.description}</h5>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

Note.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(`http://localhost:3000/api/notes/${id}`);
  const { data } = await res.json();
  console.log("data", data);
  return { note: data };
};

export default Note;
