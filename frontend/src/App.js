import logo from "./logo.svg";
import "./App.css";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import ForgotPasswordPage from "./components/ForgotPasswordPage";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import AllUsersPage from "./components/AllUsersPage";
import HomePage from "./components/HomePage";

function App() {
  const [token, setToken] = useState();
  function addToken(auth_token) {
    setToken(auth_token);
  }
  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path="/login" element={<LoginPage addToken={addToken} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
        <Route path="/" element={<NavBar token={token} />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/allUsers" element={<AllUsersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
