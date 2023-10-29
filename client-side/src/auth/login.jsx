// react
import { useEffect, useState, useRef } from "react";
// styling
import styles from "../style/auth.module.css";
// routing
import { NavLink, json, useNavigate } from "react-router-dom";

const Login = () => {
  // logged in user redirect
  const navigate = useNavigate();
  useEffect(() => {
    const role = localStorage.getItem("role")
    if (role == "user") {
      navigate("/");
    } else if (role == "admin") {
      navigate("/admin");
    }
  }, []);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isValiedMail, setIsValidMail] = useState(false);
  const [isValiedPassword, setIisValiedPassword] = useState(false);
  const mailWarning = useRef();
  const passwordWarning = useRef();
  const [logginBtn, setLogginBtn] = useState(false);
  // login validation
  async function login(e) {
    e.preventDefault();
    setLogginBtn(true);
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
      setIisValiedPassword(true);
    }
  }
  //login
  useEffect(() => {
    (async function () {
      if (logginBtn) {
        if (isValiedMail && isValiedPassword) {
          try {
            const type = "User";
            const res = await fetch("http://localhost:8000/login", {
              method: "POST",
              body: JSON.stringify({ email, password, type }),
              headers: { "Content-Type": "application/json" },
              credentials: "include",
            });
            const data = await res.json();
            localStorage.setItem("role",data.role)
            if (data.role == "user") {
              navigate("/");
            } else if (data.role == "admin") {
              navigate("/admin");
            } else {
              setError(data.message);
            }
          } catch (err) {
            console.log(err);
          }
        }
        setLogginBtn(false);
      }
    })();
  }, [logginBtn]);
  return (
    <>
      <div className={styles.container}>
        <form className={styles.form}>
          <h3>Login Here</h3>
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
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button id="loginBtn" onClick={login}>
            Log In
          </button>
          <NavLink to="/signup">don't have account?</NavLink>
        </form>
      </div>
    </>
  );
};

export default Login;
