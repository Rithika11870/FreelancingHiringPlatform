import React, { useState } from "react";

function ForgotPassword({ onBackToLogin }) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8080/api/users/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        setMessage("OTP sent to your email!");
      } else {
        setMessage("Email not found!");
      }
    } catch (error) {
      setMessage("Server connection failed!");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8080/api/users/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp,
            password: newPassword,
          }),
        }
      );

      if (response.ok) {
        setMessage("Password reset successful!");
      } else {
        setMessage("Invalid or expired OTP!");
      }
    } catch (error) {
      setMessage("Server connection failed!");
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>

      <form onSubmit={handleForgotPassword}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send OTP</button>
      </form>

      <hr />

      <form onSubmit={handleResetPassword}>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <button type="submit">Reset Password</button>
      </form>

      <p>{message}</p>

      <button onClick={onBackToLogin}>Back to Login</button>
    </div>
  );
}

export default ForgotPassword;