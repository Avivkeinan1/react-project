import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/navbar";
import Home from "./components/home";
import { Route, Routes } from "react-router-dom";
import SignUp from "./components/signUp";
import About from "./components/about";
import SignIn from "./components/signin";
import { AuthProvider } from "./context/authContext";
import SignUpBiz from "./components/signUpBiz";
import MyCards from "./components/myCards";
import SignOut from "./components/signOut";
import ProtectedRoute from "./common/protectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateCard from "./components/createCard";
import DeleteCard from "./components/deleteCard";
import EditCard from "./components/editCard";
import Footer from "./components/footer";
import { useState } from "react";

function App() {
  const [isDark, setIsDark] = useState(false);

  const handleChangePageColorToDark = () => {
    setIsDark((isDark) => !isDark);
  };
  return (
    <div
      className="App d-flex flex-column min-vh-100"
      style={{ backgroundColor: isDark ? "black" : "white" }}
    >
      <button onClick={handleChangePageColorToDark}>
        {!isDark ? (
          <i className="bi bi-sun"></i>
        ) : (
          <i className="bi bi-moon"></i>
        )}{" "}
      </button>
      <ToastContainer />
      <header>
        <NavBar />
      </header>
      <main className="flex-fill container">
        <Routes>
          <Route path={"react-project"} element={<Home />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="about" element={<About />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route
            path="my-cards"
            element={
              <ProtectedRoute onlyBiz>
                <MyCards />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-cards/edit/:id"
            element={
              <ProtectedRoute onlyBiz>
                <EditCard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-cards/delete/:id"
            element={
              <ProtectedRoute onlyBiz>
                <DeleteCard />
              </ProtectedRoute>
            }
          />
          <Route
            path="create-card"
            element={
              <ProtectedRoute onlyBiz>
                <CreateCard />
              </ProtectedRoute>
            }
          />
          <Route path="logout" element={<SignOut />} />
          <Route path="sign-up-biz" element={<SignUpBiz />} />
        </Routes>
      </main>

      <footer>
        {" "}
        <Footer />{" "}
      </footer>
    </div>
  );
}

export default App;
