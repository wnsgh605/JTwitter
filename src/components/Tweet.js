import React, { useState } from "react";
import { fData } from "../firebase";

function Tweet({ text, isOwner }) {
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(text.text);
  const onDeleteClick = () => {
    const ok = window.confirm("Are you sure you want to delete this Tweet?");
    if (ok) {
      fData.doc(`Tweet/${text.id}`).delete();
    }
  };
  const onEditClick = () => {
    setEditing((prev) => !prev);
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewText(value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await fData.doc(`Tweet/${text.id}`).update({
      text: newText,
    });
    setEditing(false);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input onChange={onChange} type="text" value={newText} />
            <button type="submit">Save</button>
            <button onClick={onEditClick}>Cancel</button>
          </form>
        </>
      ) : (
        <>
          <h4>{text.text}</h4>
          {isOwner ? (
            <>
              <button onClick={onDeleteClick}>Delete</button>
              <button onClick={onEditClick}>Edit</button>
            </>
          ) : null}
        </>
      )}
    </div>
  );
}

export default Tweet;
