import { useState } from 'react'
import './App.css'

 function App() {
  const [noteTitle, setNoteTitle] = useState("");
  const [notes, setNotes] = useState([
    { id: 1, title: "Note -1" },
  ]);

  const [editMode, setEditMode] = useState(false);
  const [editableNote, setEditableNote] = useState(null);

  const onChangeHandler = (e) => {
    setNoteTitle(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (noteTitle.trim() === "") {
      return alert("Please provide a valid title");
    }

    editMode ? updateHandler() : createHandler();
  };

  const createHandler = () => {
    const newNote = {
      id: Date.now() + "",
      title: noteTitle,
    };

    setNotes([...notes, newNote]);
    setNoteTitle("");
  };

  const removeHandler = (noteId) => {
    const updatedNotes = notes.filter((item) => item.id !== noteId);
    setNotes(updatedNotes);
  };

  const editHandler = (note) => {
    setEditMode(true);
    setEditableNote(note);
    setNoteTitle(note.title);
  };

  const updateHandler = () => {
    const updatedNotes = notes.map((item) =>
      item.id === editableNote.id ? { ...item, title: noteTitle } : item
    );

    setNotes(updatedNotes);
    setEditMode(false);
    setNoteTitle("");
    setEditableNote(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <h2 className="text-2xl font-bold text-center mb-4">
          {editMode ? "Edit Note" : "Add Note"}
        </h2>
        <form onSubmit={submitHandler} className="flex flex-col gap-3">
          <input
            type="text"
            value={noteTitle}
            onChange={onChangeHandler}
            className="border rounded-lg p-2 w-full"
            placeholder="Enter note title"
          />
          <button
            type="submit"
            className="cursor-pointer bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            {editMode ? "Update Note" : "Add Note"}
          </button>
        </form>
      </div>

      <div className="mt-6 w-96">
        <h1 className="text-xl font-bold mb-2">All Notes</h1>
        <ul className="bg-white shadow-lg rounded-lg p-4 divide-y divide-gray-200">
          {notes.map((note) => (
            <li key={note.id} className="py-2 flex justify-between items-center">
              <span>{note.title}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => editHandler(note)}
                  className="cursor-pointer bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => removeHandler(note.id)}
                  className="cursor-pointer bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


export default App;

