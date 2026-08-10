import "../App.css";
import { useState } from "react";
function Login({onRegister, onLoginSuccess}) {
 const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const handleLogin = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

   if (response.ok) {
  const user = await response.json();
  alert("Login Successful!");
  console.log(user);
  onLoginSuccess(user);
} else {
      alert("Invalid Email or Password");
    }
  } catch (error) {
    alert("Cannot connect to Spring Boot Server");
    console.error(error);
  }
};
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back</h2>

        <p>Login to your freelancing account</p>

        <input
  type="email"
  placeholder="Enter Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

       <input
  type="password"
  placeholder="Enter Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>

        <button onClick={handleLogin}>Login</button>

        <p>
          Don't have an account?{" "}
          <button
  className="register-link"
  onClick={onRegister}
>
  Register
</button>
        </p>
      </div>
    </div>
  );
}

export default Login;