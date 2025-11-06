import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      return alert("All fields are required!");
    }

    try {
      const res = await axios.post(
        "https://blog-three-gules-72.vercel.app/user/register",
        {
          username,
          email,
          password,
        }
      );

      console.log("User registered:", res.data);
      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Registration failed! Email might already exist.");
    }
  };

  return (
    <div
      className={`d-flex justify-content-center align-items-center vh-100 
      }`}
    >
      <form
        onSubmit={handleRegister}
        className={`p-4 rounded shadow `}
        style={{ width: "320px" }}
      >
        <h2 className="text-center mb-4">Register</h2>

        <input
          type="text"
          placeholder="Enter Username"
          className={`form-control mb-3 `}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email"
          className={`form-control mb-3 `}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          className={`form-control mb-3 `}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="btn btn-success w-100">
          Register
        </button>

        <div className="text-center mt-3">
          <p>
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              style={{ cursor: "pointer", color: "#0d6efd" }}
            >
              Login here
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
