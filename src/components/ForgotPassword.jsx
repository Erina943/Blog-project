import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) return alert("Please enter your email");

    try {
      const res = await axios.post(
        "https://blog-three-gules-72.vercel.app/user/forgot-password",
        { email }
      );
      setMessage("If that email exists, a reset link has been sent.");
    } catch (err) {
      setMessage("Something went wrong. Try again.");
    }
  };

  return (
    <div className={`d-flex justify-content-center align-items-center vh-100 `}>
      <form
        onSubmit={handleSubmit}
        className={`p-4 rounded shadow `}
        style={{ width: "340px" }}
      >
        <h3 className="text-center mb-4">Forgot Password</h3>

        <input
          type="email"
          placeholder="Enter your registered email"
          className={`form-control mb-3 `}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit" className="btn btn-primary w-100">
          Send Reset Link
        </button>

        {message && (
          <p className="text-center mt-3 small text-success">{message}</p>
        )}

        <p className="text-center mt-3">
          <span
            style={{ cursor: "pointer", color: "#0d6efd" }}
            onClick={() => navigate("/reset-password/:token")}
          >
            Reset Password
          </span>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
