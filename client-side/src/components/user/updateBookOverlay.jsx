import styles from "../../style/bookCard.module.css";
import { useRef, useState } from "react";
export function UpdateBookOverlay({
  setShowOverlay,
  bookISBN,
  book,
  getBooks,
}) {
  //   state
  const [title, setTitle] = useState(book.title);
  const [description, setDescription] = useState(book.description);
  const [author, setAuthor] = useState(book.author);
  const [copiesNumber, setCopiesNumber] = useState(book.availableCopies);
  const [error, setError] = useState(false);

  // elements
  const overlay = useRef(null);
  function handelClose() {
    setShowOverlay(false);
  }

  async function handelUpdate(e) {
    e.preventDefault();
    try {
      setShowOverlay(false);
      const res = await fetch(`http://localhost:8000/book/${bookISBN}`, {
        method: "PUT",
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
      if (!data.success) {
        setError(data.message);
      }
      getBooks();
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <form className={styles.overlay}>
      <div className={styles.form2}>
        <label style={{ color: "blue" }}>title</label>
        <input
          type="text"
          className={styles.input}
          placeholder="book title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          required
        />
        <label style={{ color: "blue" }}>description</label>
        <input
          value={description}
          type="text"
          className={styles.input}
          placeholder="book description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <label style={{ color: "blue" }}>author</label>
        <input
          type="text"
          value={author}
          className={styles.input}
          placeholder="author"
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
        />
        <label style={{ color: "blue" }}>number of copies</label>
        <input
          type="text"
          value={copiesNumber}
          className={styles.input}
          placeholder="no of copies"
          onChange={(e) => {
            setCopiesNumber(e.target.value);
          }}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button className={styles.editBtn} onClick={handelUpdate}>
          edit
        </button>
        <button className={styles.close} onClick={handelClose}>
          x
        </button>
      </div>
    </form>
  );
}
