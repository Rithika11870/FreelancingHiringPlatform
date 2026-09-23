import "../App.css";
import { useState } from "react";

function Login({ onRegister, onLoginSuccess, onForgotPassword }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("FREELANCER");
  const [showPassword, setShowPassword] = useState(false);

const handleLogin = async () => {
  try {
    const response = await fetch(
      "http://localhost:8080/api/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );

    const text = await response.text();

    if (!response.ok) {
      alert("Invalid Email or Password");
      return;
    }

    if (!text.trim()) {
      alert("Invalid Email or Password");
      return;
    }

    const user = JSON.parse(text);

    alert("Login Successful!");
    onLoginSuccess(user);
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    alert("Cannot connect to Spring Boot Server");
  }
};
  return (
    <div className="auth-page">

      {/* Left Panel */}
      <div className="auth-left-panel">
        <div className="auth-brand">
          <div className="auth-logo">〰</div>

          <div>
            <h2>SkillBridge</h2>
            <p>Freelance • Hire • Grow</p>
          </div>
        </div>

        <div className="auth-left-content">
          <p className="auth-label">WELCOME TO SKILLBRIDGE</p>

          <h1>
            Connect.
            <br />
            Collaborate.
            <br />
            <span>Build the Future.</span>
          </h1>

          <p>
            Find opportunities, connect with talented professionals,
            and bring your ideas to life.
          </p>

          <div className="auth-character">
            <div className="character-person">👩🏻‍💻</div>
            <div className="character-laptop">💻</div>
          </div>
        </div>

        <div className="auth-left-footer">
          <span>✓</span> Trusted by freelancers and clients
        </div>
      </div>

      {/* Right Panel */}
      <div className="auth-right-panel">
        <div className="login-card">

          <div className="mobile-brand">
            <h2>SkillBridge</h2>
          </div>

          <h1>Welcome Back!</h1>

          <p className="login-subtitle">
            Login to continue your SkillBridge journey.
          </p>

          <div className="role-switch">
            <button
              className={role === "FREELANCER" ? "selected-role" : ""}
              onClick={() => setRole("FREELANCER")}
            >
              👤 Freelancer
            </button>

            <button
              className={role === "CLIENT" ? "selected-role" : ""}
              onClick={() => setRole("CLIENT")}
            >
              💼 Client
            </button>
          </div>

          <label>Email Address</label>

          <div className="input-wrapper">
            <span>✉</span>

            <input
              type="email"
              name="username"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
          </div>

          <label>Password</label>

          <div className="input-wrapper">
            <span>🔒</span>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />

            <button
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              type="button"
            >
              {showPassword ? "🙈" : "👁"}
            </button>
          </div>

          <div className="login-options">
            <label className="remember-option">
              <input type="checkbox" />
              Remember me
            </label>

            <button
              className="forgot-btn"
              onClick={onForgotPassword}
            >
              Forgot Password?
            </button>
          </div>

          <button className="main-login-btn" onClick={handleLogin}>
            Login →
          </button>

          <div className="divider">
            <span>OR</span>
          </div>

          <p className="register-text">
            Don't have an account?{" "}
            <button onClick={onRegister}>Register Now</button>
          </p>

          <p className="secure-text">
            🔒 Your information is secure with us
          </p>

        </div>
      </div>

    </div>
  );
}

export default Login;