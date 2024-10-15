import "../styles/Home.css";
import { NoteObjectProps } from "../types/NoteTypes";
import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";

export const Home = () => {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    await api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((error) => alert(error));
  };

  const deleteNote = async (id: number) => {
    await api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note deleted successfully");
        else alert("Failed to delete note");
      })
      .catch((error) => alert(error));
    fetchNotes();
  };

  const createNote = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    api
      .post("/api/notes/", { title, content })
      .then((res) => {
        if (res.status === 201) alert("Note created successfully");
        else alert("Failed to create note");
      })
      .catch((error) => alert(error));
    fetchNotes();
  };

  return (
    <div>
      <div className="notes-section">
        <h2>Your Notes</h2>
        <div className="notes-wrapper">
          {notes.map((note: NoteObjectProps) => (
            <Note key={note.id} note={note} onDelete={deleteNote} />
          ))}
        </div>
      </div>
      <div className="form-wrapper">
        <h2>Create a Note</h2>
        <form onSubmit={createNote} className="note-form">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            value={title}
            placeholder="Title"
            id="title"
            name="title"
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="content">Content:</label>
          <textarea
            value={content}
            placeholder="Content"
            id="content"
            name="content"
            required
            onChange={(e) => setContent(e.target.value)}
          />
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};
