import noBooks from "../../assets/noBooks.jpeg";
import ReservedBookCard from '../../components/user/reservedBookCard';
import { useEffect, useState } from "react";
import styles from "../../style/bookCard.module.css";

function Reserved() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async function () {
      try {
        const res = await fetch(`http://localhost:8000/user-reserved-books`, {
          credentials: "include",
        });
        const data = await res.json();
        setBooks(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return <div></div>;
  }
  return (
    <>
      <div className={styles.container}>
        {books.length > 0 ? (
          <>
            <ReservedBookCard books={books}></ReservedBookCard>
          </>
        ) : (
          <>
            <h2>no reserved books</h2>
            <img src={noBooks} className={styles.noBooks} />
          </>
        )}
      </div>
    </>
  );
}

export default Reserved;
