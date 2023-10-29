import { Routes, Route, useNavigate } from "react-router-dom";
// pages
import Home from "../pages/user/home";
import AddBook from "../pages/user/addBook";
import UserBooks from "../pages/user/UserBooks";
import Reserved from "../pages/user/reserved";

// components
import NotFound from "./notFound";
import Nav from "./user/nav";
//react
import { useEffect } from "react";

const Main = () => {
  //  protecting routes
  const navigate = useNavigate();
  useEffect(() => {
    if (!document.cookie) {
      navigate("/login");
    }
  }, []);
  
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Nav />
              <Home />
            </>
          }
        ></Route>
        <Route
          path="/add"
          element={
            <>
              <Nav />
              <AddBook />
            </>
          }
        ></Route>
        <Route
          path="/user-books"
          element={
            <>
              <Nav />
              <UserBooks />
            </>
          }
        ></Route>
        <Route
          path="/reserved-books"
          element={
            <>
              <Nav />
              <Reserved />
            </>
          }
        ></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default Main;
