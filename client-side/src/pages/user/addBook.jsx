// styling
import styles from "../../style/addBook.module.css";
// react
import { useState } from "react";
// routing
import { useNavigate } from "react-router-dom";
// components
import Toast from "../../components/user/toast";
function AddBook() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [copiesNumber, setCopiesNumber] = useState("");
  const [error, setError] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const navigate = useNavigate();
  async function addBook(e) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/add-book", {
        method: "POST",
        body: JSON.stringify({
          title: title,
          author: author,
          description: description,
          availableCopies: copiesNumber,
        }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setIsCreated(true);
        setTimeout(() => {
          navigate("/user-books");
        }, 3000);
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={addBook}>
          <h3>add book</h3>
          <label>title</label>
          <input
            type="text"
            className={styles.input}
            placeholder="book title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            required
          />
          <label>description</label>
          <input
            type="text"
            className={styles.input}
            placeholder="book description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <label>author</label>
          <input
            type="text"
            className={styles.input}
            placeholder="author"
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
          />
          <label>number of copies</label>
          <input
            type="text"
            className={styles.input}
            placeholder="no of copies"
            onChange={(e) => {
              setCopiesNumber(e.target.value);
            }}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button id="btn">add book</button>
        </form>
      </div>
      {isCreated && (
        <Toast
          message="book is pending until it is approved by one of admins"
          bgcolor="blue"
        ></Toast>
      )}
    </>
  );
}

export default AddBook;
