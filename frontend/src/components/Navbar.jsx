import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const [logoutMessage, setLogoutMessage] = useState(""); // State for logout message

  const onLogout = () => {
    logout();
    setLogoutMessage("Successfully logged out!"); // Set the message when user logs out
    navigate("/login", { replace: true });
  };

  // Use effect to clear the logout message after a short delay
  useEffect(() => {
    if (logoutMessage) {
      const timer = setTimeout(() => {
        setLogoutMessage(""); // Clear the message after 3 seconds
      }, 3000);

      return () => clearTimeout(timer); // Clean up the timer on component unmount
    }
  }, [logoutMessage]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link
          className="navbar-brand"
          to={isAuthenticated ? "/tasks" : "/login"}
        >
          Task Manager
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#tm_navbar"
          aria-controls="tm_navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="tm_navbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {!isAuthenticated ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/tasks">
                    Tasks
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/tasks/create">
                    Create Task
                  </NavLink>
                </li>

                {user?.role === "admin" && (
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/users">
                      Users
                    </NavLink>
                  </li>
                )}
              </>
            )}
          </ul>

          {isAuthenticated && (
            <div className="d-flex align-items-center gap-3">
              <span className="text-light small d-none d-lg-inline">
                {user?.email} ({user?.role})
              </span>
              <button
                className="btn btn-outline-light btn-sm"
                onClick={onLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Show logout message */}
      {logoutMessage && (
        <div className="alert alert-success mt-3" role="alert">
          {logoutMessage}
        </div>
      )}
    </nav>
  );
}
