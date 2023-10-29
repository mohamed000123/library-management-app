import noBooks from "../../assets/noBooks.jpeg";
import BookCard from "../../components/user/bookCard";
import { useEffect, useState, useRef } from "react";
import { Button } from "@mui/material";
import styles from "../../style/bookCard.module.css";

function Home() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchResult, setSearchResult] = useState(null);
  const inputField = useRef();
  useEffect(() => {
    (async function () {
      try {
        const res = await fetch(`http://localhost:8000/available-books`, {
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

  async function handelSearch(keyWord) {
    try {
      const res = await fetch(`http://localhost:8000/search/${keyWord}`, {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      setSearchResult(data);
    } catch (err) {
      console.log(err);
    }
  }
  if (isLoading) {
    return <div></div>;
  }
  return (
    <>
      <div className={styles.container}>
        {books.length > 0 ? (
          <>
            <div className={styles.search}>
              <input
                placeholder="Search ....."
                ref={inputField}
                onChange={(e) => {
                  if (e.target.value.length > 0) {
                    handelSearch(e.target.value);
                  } else {
                    setSearchResult(null);
                  }
                }}
              />
              <Button variant="contained" size="small" disabled>
                search
              </Button>
            </div>
            <h2>available books</h2>
            <BookCard books={searchResult ? searchResult : books}></BookCard>
          </>
        ) : (
          <>
            <h2>no new books in the library for now</h2>
            <img src={noBooks} className={styles.noBooks} />
          </>
        )}
      </div>
    </>
  );
}

export default Home;
