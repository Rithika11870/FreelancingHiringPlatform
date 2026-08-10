import "../App.css";
import { useState } from "react";
function Register({onLogin}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const handleRegister = async () => {
  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  const user = {
    name: name,
    email: email,
    password: password,
    role: "USER"
  };

  try {
    const response = await fetch("http://localhost:8080/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });

    if (response.ok) {
      alert("Registration Successful!");
      onLogin();
    } else {
      alert("Registration Failed!");
    }
  } catch (error) {
    alert("Cannot connect to Spring Boot Server");
  }
};
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Create Account</h2>

        <p>Join SkillBridge today</p>

       <input
  type="text"
  placeholder="Enter Full Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

        <input
  type="email"
  placeholder="Enter Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

        <input
  type="password"
  placeholder="Create Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>

       <input
  type="password"
  placeholder="Confirm Password"
  onChange={(e) => setConfirmPassword(e.target.value)}
/>

        <button onClick={handleRegister}>Register</button>
        <p>
  Already have an account?{" "}
  <button
  className="register-link"
  onClick={onLogin}
>
  Login
</button>
</p>
      </div>
    </div>
  );
}

export default Register;