import styles from "../../style/bookCard.module.css";
export default function ReservedBookCard({ books, userBooks }) {
  return (
    <>
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
            </div>
          );
        })
      ) : (
        <h2>no books available</h2>
      )}
    </>
  );
}
