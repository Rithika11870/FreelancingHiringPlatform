import React from "react";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import ProjectForm from "./components/ProjectForm";
function App() {
  const [page, setPage] = React.useState("login");
const [loggedInUser, setLoggedInUser] = React.useState(null);
  return (
    <div>
     {page === "login" ? (
  <Login
  onRegister={() => setPage("register")}
  onLoginSuccess={(user) => {
    setLoggedInUser(user);
    setPage("dashboard");
  }}
/>
) : page === "register" ? (
  <Register onLogin={() => setPage("login")} />
) : page === "projectForm" ? (
  <ProjectForm />
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