import { useState,useEffect } from "react";
import styles from "../../style/bookCard.module.css";

const Toast = ({ message, bgcolor }) => {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div
      className={show ? styles.toast : styles.disappear}
      style={{ background: bgcolor }}
    >
      <p>{message}</p>
    </div>
  );
};

export default Toast;
