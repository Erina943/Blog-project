import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const getEmail = useRef();
  const getPassword = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      return alert("Please enter your email");
    }
    if (!password) {
      return alert("Please enter your password");
    }

    try {
      const user = await axios.post(
        "https://blog-three-gules-72.vercel.app/user/login",
        {
          email,
          password,
        }
      );
      console.log("user", user);

      const token = user.data.accessToken;
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);

      console.log("Login successful ");
      navigate("/list");
    } catch (err) {
      alert("email or password are incorrect!");
    }
  };

  return (
    <div className={`d-flex justify-content-center align-items-center vh-100 `}>
      <form
        onSubmit={handleSubmit}
        className={`p-4 rounded shadow `}
        style={{ width: "320px" }}
      >
        <h2 className="text-center mb-4">Login</h2>

        <input
          type="email"
          ref={getEmail}
          placeholder="Enter your Email"
          className={`form-control mb-3 `}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          ref={getPassword}
          placeholder="Enter your Password"
          className={`form-control mb-3 `}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>

        <p className="mt-3 text-center">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            style={{ cursor: "pointer", color: "#0d6efd" }}
          >
            Register here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
