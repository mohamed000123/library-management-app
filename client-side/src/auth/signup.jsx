// styling
import styles from "../style/auth.module.css";
// react
import { useEffect, useState, useRef } from "react";
// routing
import { NavLink, useNavigate } from "react-router-dom";
const Signup = () => {
  //logged in user redirect
  const navigate = useNavigate();
  useEffect(() => {
    if (document.cookie) {
      navigate("/");
    }
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValiedMail, setIsValidMail] = useState(false);
  const [isValiedPassword, setIisValiedPassword] = useState(false);
  const [signupError, setSignupError] = useState(null);
  const mailWarning = useRef();
  const passwordWarning = useRef();
  const passwordConfirmWarning = useRef();
  const [signupBtn, setSignupBtn] = useState(false);
  // signup validation
  async function signUp(e) {
    e.preventDefault();
    setSignupBtn(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailIsValid = emailRegex.test(email);
    if (!emailIsValid) {
      mailWarning.current.style.display = "block";
    } else {
      mailWarning.current.style.display = "none";
      setIsValidMail(true);
    }
    if (password.length < 8) {
      passwordWarning.current.style.display = "block";
    } else {
      passwordWarning.current.style.display = "none";
    }
    if (password !== confirmPassword) {
      passwordConfirmWarning.current.style.display = "block";
    } else {
      passwordConfirmWarning.current.style.display = "none";
      setIisValiedPassword(true);
    }
  }
  //signup
  useEffect(() => {
    (async function () {
      if (signupBtn) {
        if (isValiedMail && isValiedPassword) {
          const type = "User";
          try {
            const res = await fetch("http://localhost:8000/signup", {
              method: "POST",
              body: JSON.stringify({ email, password, type }),
              headers: { "Content-Type": "application/json" },
              credentials: "include",
            });
            const data = await res.json();
            if (data.user) {
              navigate("/");
            } else {
              setSignupError(data);
            }
          } catch (err) {
            console.log(err);
          }
        }
        setSignupBtn(false);
      }
    })();
  }, [signupBtn]);
  return (
    <>
      <div className={styles.container}>
        <form className={styles.form}>
          <h3>Sign Up Here</h3>
          <label>Email</label>
          <input
            id="email"
            type="text"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <p ref={mailWarning} className={styles.warning}>
            Please enter valid mail
          </p>
          <label>Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <p ref={passwordWarning} className={styles.warning}>
            Password should be at least 8 characters long
          </p>
          <label>Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          <p ref={passwordConfirmWarning} className={styles.warning}>
            unmatched password
          </p>
          {signupError && <p style={{ color: "red" }}>{signupError}</p>}
          <button id="btn" onClick={signUp}>
            Sign Up
          </button>
          <NavLink to="/">already have account?</NavLink>
        </form>
      </div>
    </>
  );
};

export default Signup;
