import "../styles/Home.css";
import { NoteObjectProps } from "../types/NoteTypes";
import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";

export const Home = () => {
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState("");
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchNotes();
    fetchUser();
  }, []);

  const fetchUser = async () => {
    await api
      .get("/api/user/me/")
      .then((res) => res.data)
      .then((data) => {
        setUser(data.username);
      })
      .catch((error) => alert(error));
  };

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

  const today = new Date();
  const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;

  return (
    <div>
      <div className="notes-section">
        <div className="note-header">
          <div className="user-wrapper">WELCOME, {user}</div>
          <div className="date-wrapper">DATE: {formattedDate}</div>
        </div>
        <h2>Notes</h2>
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
          <input type="submit" value="Create" />
        </form>
      </div>
    </div>
  );
};
