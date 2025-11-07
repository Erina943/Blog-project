import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword)
      return alert("Please fill out both fields");
    if (password !== confirmPassword) return alert("Passwords do not match");

    try {
      await axios.post(
        `https://blog-three-gules-72.vercel.app/user/reset-password/${token}`,
        { password }
      );
      alert("Password reset successful! You can now log in.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setMessage("Invalid or expired token. Try again.");
    }
  };

  return (
    <div className={`d-flex justify-content-center align-items-center vh-100 `}>
      <form
        onSubmit={handleReset}
        className={`p-4 rounded shadow `}
        style={{ width: "340px" }}
      >
        <h3 className="text-center mb-4">Reset Password</h3>

        <input
          type="password"
          placeholder="New Password"
          className={`form-control mb-3 `}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          className={`form-control mb-3 `}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button type="submit" className="btn btn-primary w-100">
          Reset Password
        </button>

        {message && (
          <p className="text-center mt-3 small text-danger">{message}</p>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;
