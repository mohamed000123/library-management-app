import styles from "../../style/bookCard.module.css";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import Toast from "../../components/user/toast";

export default function Admin() {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const [books, setBooks] = useState([]);

  const getBinnedBooks = async () => {
    try {
      const res = await fetch(`http://localhost:8000/pinned`, {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      if (data) {
        setBooks(data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getBinnedBooks();
  }, []);
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
          getBinnedBooks();
          setIsDeleted(false);
        }, 3000);
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function handelConfirm(ISBN) {
    try {
      const res = await fetch(`http://localhost:8000/approve/${ISBN}`, {
        credentials: "include",
      });
      const data = await res.json();
      if (data) {
        setIsConfirmed(true);
        setTimeout(() => {
          getBinnedBooks();
          setIsConfirmed(false);
        }, 3000);
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      {isDeleted && (
        <Toast message="book deleted succrssfully" bgcolor="red"></Toast>
      )}
      {isConfirmed && (
        <Toast message="book confirmed succrssfully" bgcolor="blue"></Toast>
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
              <Button
                variant="contained"
                style={{ marginRight: "7px" }}
                onClick={() => {
                  handelConfirm(book.ISBN);
                }}
              >
                confrim
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={() => {
                  handelDelete(book.ISBN);
                }}
              >
                cancel
              </Button>
            </div>
          );
        })
      ) : (
        <h2>no pending books</h2>
      )}
    </>
  );
}
