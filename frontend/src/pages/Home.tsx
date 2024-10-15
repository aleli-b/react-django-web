import "../styles/Home.css";
import { useState, useEffect } from "react";
import api from "../api";

// interface Note {
//   id: number;
//   title: string;
//   content: string;
//   author: string;
//   created_at: string;
// }

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
    api.post("/api/notes/", { title, content }).then((res) => {
      if (res.status === 201) alert("Note created successfully")
      else alert("Failed to create note");
    })
    .catch((error) => alert(error));
    fetchNotes();
  };

  return (
    <div>
      <div>
        <h2>Notes</h2>
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
