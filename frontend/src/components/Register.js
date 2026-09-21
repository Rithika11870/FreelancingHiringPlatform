import "../App.css";
import { useState } from "react";

function Register({ onLogin }) {
  console.log("NEW REGISTER PAGE LOADED");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("FREELANCER");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (password.length < 8) {
      alert("Password must contain at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const user = {
      name: name,
      email: email,
      password: password,
      role: role,
    };

    try {
      const response = await fetch(
        "http://localhost:8080/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      if (response.ok) {
        alert("OTP sent to your email!");
        setShowOtp(true);
      } else {
        alert("Registration Failed!");
      }
    } catch (error) {
      alert("Cannot connect to Spring Boot Server");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/users/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            otp: otp,
          }),
        }
      );

      if (response.ok) {
        alert("Email verified successfully!");
        onLogin();
      } else {
        alert("Invalid or expired OTP!");
      }
    } catch (error) {
      alert("Cannot connect to Spring Boot Server");
    }
  };

  if (showOtp) {
    return (
      <div className="auth-page">
        <div className="auth-left-panel">
          <div className="auth-brand">
            <div className="auth-logo">〰</div>
            <div>
              <h2>SkillBridge</h2>
              <p>Freelance • Hire • Grow</p>
            </div>
          </div>

          <div className="auth-left-content">
            <p className="auth-label">ALMOST THERE!</p>
            <h1>
              Verify.
              <br />
              Connect.
              <br />
              <span>Start Growing.</span>
            </h1>
            <p>Verify your email and begin your SkillBridge journey.</p>

            <div className="auth-character">
              <div className="character-person">📧</div>
              <div className="character-laptop">🔐</div>
            </div>
          </div>
        </div>

        <div className="auth-right-panel">
          <div className="login-card">
            <h1>Verify Email</h1>
            <p className="login-subtitle">
              Enter the OTP sent to your email address.
            </p>

            <label>One-Time Password</label>

            <div className="input-wrapper">
              <span>🔑</span>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>

            <button className="main-login-btn" onClick={handleVerifyOtp}>
              Verify OTP →
            </button>

            <p className="register-text">
              Wrong email?{" "}
              <button onClick={() => setShowOtp(false)}>Go Back</button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-left-panel">
        <div className="auth-brand">
          <div className="auth-logo">〰</div>
          <div>
            <h2>SkillBridge</h2>
            <p>Freelance • Hire • Grow</p>
          </div>
        </div>

        <div className="auth-left-content">
          <p className="auth-label">JOIN OUR COMMUNITY</p>

          <h1>
            Join
            <br />
            SkillBridge
            <br />
            <span>Today.</span>
          </h1>

          <p>
            Create your account and start your journey with talented
            professionals and exciting opportunities.
          </p>

          <div className="auth-character">
            <div className="character-person">👩🏻‍💻</div>
            <div className="character-laptop">💻</div>
            <div className="character-plant">🌿</div>
          </div>
        </div>

        <div className="auth-left-footer">
          <span>✓</span> Build your future with SkillBridge
        </div>
      </div>

      <div className="auth-right-panel">
        <div
  className="login-card register-card"
  autoComplete="off"
>
          <h1>Create Account</h1>

          <p className="login-subtitle">
            Create your account and start your journey today.
          </p>

          <div className="role-switch">
            <button
              className={role === "FREELANCER" ? "selected-role" : ""}
              onClick={() => setRole("FREELANCER")}
              type="button"
            >
              👤 Freelancer
            </button>

            <button
              className={role === "USER" ? "selected-role" : ""}
              onClick={() => setRole("USER")}
              type="button"
            >
              💼 Client
            </button>
          </div>

          <label>Full Name</label>

          <div className="input-wrapper">
            <span>👤</span>
          <input
  type="text"
  name="user_display_name"
  autoComplete="nope"
  placeholder="Enter your name"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
          </div>

          <label>Email Address</label>

          <div className="input-wrapper">
            <span>✉</span>
       <input
  type="email"
  name="user_contact_field"
  autoComplete="new-password"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
          </div>

          <label>Password</label>

          <div className="input-wrapper">
            <span>🔒</span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁"}
            </button>
          </div>

          {password.length > 0 && password.length < 8 && (
            <p className="password-warning">
              Minimum 8 characters required
            </p>
          )}

          {password.length >= 8 && (
            <p className="password-success">Strong password ✓</p>
          )}

          <label>Confirm Password</label>

          <div className="input-wrapper">
            <span>🔒</span>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            >
              {showConfirmPassword ? "🙈" : "👁"}
            </button>
          </div>

          <button className="main-login-btn" onClick={handleRegister}>
            Register →
          </button>

          <div className="divider">
            <span>OR</span>
          </div>

          <p className="register-text">
            Already have an account?{" "}
            <button onClick={onLogin}>Login</button>
          </p>

          <p className="secure-text">
            🔒 Your information is secure with us
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;