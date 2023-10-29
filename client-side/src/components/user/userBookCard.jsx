import { useState } from "react";
import styles from "../../style/bookCard.module.css";
import Toast from "./toast";
import { UpdateBookOverlay } from "./updateBookOverlay";
export default function UserBookCard({ books, getBooks }) {
  const [isDeleted, setIsDeleted] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [bookISBN, setBookISBN] = useState("");
  const [book, setBook] = useState();

  async function handelDelete(ISBN) {
    try {
      const res = await fetch(`http://localhost:8000/book/${ISBN}`, {
        credentials: "include",
        method: "DELETE",
      });
      const data = await res.json();
      if (data) {
        setIsDeleted(true);
        setTimeout(() => {
          getBooks();
          setIsDeleted(false);
        }, 3000);
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function handelUpdate(ISBN) {
    setShowOverlay(true);
    setBookISBN(ISBN);
    try {
      const res = await fetch(`http://localhost:8000/book/${ISBN}`, {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      setBook(data);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      {isDeleted && (
        <Toast message="book deleted succrssfully" bgcolor="red"></Toast>
      )}
      {books.length > 0 ? (
        books.map((book) => {
          return (
            <div className={styles.book} key={book.ISBN}>
              <p>
                title:
                <span style={{ color: "blue" }}>{book.title}</span>
              </p>
              <p>
                author:
                <span style={{ color: "blue" }}>{book.title}</span>
              </p>
              <p>
                description:
                <span style={{ color: "blue" }}>{book.description}</span>
              </p>
              <p>
                available copies:
                <span style={{ color: "blue" }}>{book.availableCopies}</span>
              </p>
              {book.status == "aproved" ? (
                <>
                  <span
                    className={styles.delete}
                    onClick={() => {
                      handelDelete(book.ISBN);
                    }}
                  >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </span>
                  <span
                    className={styles.update}
                    onClick={() => {
                      handelUpdate(book.ISBN);
                    }}
                  >
                    <i className="fas fa-edit"></i>
                  </span>
                </>
              ) : (
                <p style={{ color: "red" }}>waiting for approval (pending)</p>
              )}
            </div>
          );
        })
      ) : (
        <h2>no books available</h2>
      )}

      {showOverlay && book && (
        <UpdateBookOverlay
          getBooks={getBooks}
          book={book}
          showOverlay={showOverlay}
          bookISBN={bookISBN}
          setShowOverlay={setShowOverlay}
        ></UpdateBookOverlay>
      )}
    </>
  );
}
