import React from "react";
import "./App.css";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import ProjectForm from "./components/ProjectForm";
import ForgotPassword from "./components/ForgotPassword";

function App() {
  const [page, setPage] = React.useState("home");
  const [loggedInUser, setLoggedInUser] = React.useState(null);

  return (
    <div>
      {page === "home" ? (
        <Home
          onLogin={() => setPage("login")}
          onRegister={() => setPage("register")}
        />
      ) : page === "login" ? (
        <Login
          onRegister={() => setPage("register")}
          onForgotPassword={() => setPage("forgotPassword")}
          onLoginSuccess={(user) => {
            setLoggedInUser(user);
            setPage("dashboard");
          }}
        />
      ) : page === "register" ? (
        <Register onLogin={() => setPage("login")} />
      ) : page === "forgotPassword" ? (
        <ForgotPassword onBackToLogin={() => setPage("login")} />
      ) : page === "projectForm" ? (
        <ProjectForm
  user={loggedInUser}
  onBack={() => setPage("dashboard")}
/>
      ) : (
        <Dashboard
          user={loggedInUser}
          onPostProject={() => setPage("projectForm")}
        />
      )}
    </div>
  );
}

export default App;