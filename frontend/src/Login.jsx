import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import './Login.css'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg("");

    axios
      .post(`${process.env.REACT_APP_API_URL}/login`, { email, password })
      .then((response) => {
        console.log("Login success:", response.data);
        // You can store user info or token here (e.g. localStorage)
        navigate("/home"); // redirect to home page after login
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.data && error.response.data.error) {
          setErrorMsg(error.response.data.error);
        } else {
          setErrorMsg("Login failed. Please try again.");
        }
      });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

        <button type="submit">Login</button>
      </form>
      <p>
      {"Don't have an account? "} <Link to="/regester">Register here</Link>
    </p>
    </div>
  );
}

export default Login;
