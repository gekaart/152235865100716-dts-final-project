import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Categories from "./pages/Categories";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { auth, logouthandle } from "./config/ApiFirebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import "reactjs-popup/dist/index.css";
import AddProducts from "./pages/AddProducts";
import AddCategories from "./pages/AddCategories";
import Search from "./pages/Search";

function App() {
  const [cart, setCart] = useState([]);
  const [credential, setCredential] = useState({ email: "", password: "" });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const emailOnchageHandler = (e) => {
    setCredential({
      ...credential,
      email: e.target.value,
    });
  };

  const passwordOnchageHandler = (e) => {
    setCredential({
      ...credential,
      password: e.target.value,
    });
  };

  const loginHandle = async () => {
    try {
      const res = await signInWithEmailAndPassword(
        auth,
        credential.email,
        credential.password
      );
      setCredential({ email: "", password: "" });
      navigate("/");
      console.log(user);
      return res;
    } catch (error) {
      console.log(error);
      switch (error.code) {
        default:
          setEmailError("");
          setCredential({ email: "", password: "" });
          break;
        case "auth/invalid-email":
          setCredential({ email: "" });
          setEmailError("Your email is Invalid");
          break;
        case "auth/user-disabled":
          setEmailError("user was disabled");
          break;
        case "auth/user-not-found":
          setEmailError("user not found");
          break;
        case "auth/wrong-password":
          setCredential({ password: "" });
          setPasswordError("wrong password");
          break;
        case "auth/auth/too-many-requests":
          setCredential({ email: "", password: "" });
          setEmailError("To many failed login attempts");
          break;
      }
    }
  };

  const signUpHandle = async () => {
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        credential.email,
        credential.password
      );
      setCredential({ email: "", password: "" });
      navigate("/");
      return res;
    } catch (error) {
      switch (error.code) {
        default:
          setEmailError("");
          break;
        case "auth/email-already-in-use":
          setEmailError("your email already used");
          break;
        case "auth/invalid-email":
          setEmailError("invalid email");
          break;
        case "auth/weak-password":
          setPasswordError("your password is weak");
          break;
      }
    }
  };

  const logout = () => {
    logouthandle();
  };

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      return;
    }
    if (error) {
      console.log(error);
    }
  }, [loading, user, error]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Home cart={cart} setCart={setCart} logout={logout} user={user} />
          }
        />
        <Route
          path="/categories/:id"
          element={
            <Categories
              cart={cart}
              setCart={setCart}
              logout={logout}
              user={user}
            />
          }
        />
        <Route
          path="/cart"
          element={<Cart cart={cart} logout={logout} user={user} />}
        />
        <Route
          path="/register"
          element={
            <Register
              emailOnchageHandler={emailOnchageHandler}
              passwordOnchageHandler={passwordOnchageHandler}
              signUpHandle={signUpHandle}
              credential={credential}
              emailError={emailError}
              passwordError={passwordError}
              user={user}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              emailOnchageHandler={emailOnchageHandler}
              passwordOnchageHandler={passwordOnchageHandler}
              loginHandle={loginHandle}
              credential={credential}
              emailError={emailError}
              passwordError={passwordError}
              user={user}
            />
          }
        />
        <Route
          path="/addProducts"
          element={
            <AddProducts
              cart={cart}
              setCart={setCart}
              logout={logout}
              user={user}
            />
          }
        />
        <Route
          path="/addCategories"
          element={
            <AddCategories
              cart={cart}
              setCart={setCart}
              logout={logout}
              user={user}
            />
          }
        />
        <Route
          path="/search"
          element={
            <Search cart={cart} setCart={setCart} logout={logout} user={user} />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
