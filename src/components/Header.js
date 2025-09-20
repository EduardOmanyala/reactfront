import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const location = useLocation();
  const activePage = location.pathname;
  const { user, logout, isAuthenticated } = useAuth();

  // const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header>
      <div className="container">
        <nav className="glass flex items-center justify-between px-4 py-2">
          {/* Logo */}
          <div className="logo flex items-center gap-2">
            <div className="logo-icon">
              <svg
                viewBox="0 0 48 48"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
              >
                <circle cx="16" cy="16" r="5" opacity="0.9" />
                <circle cx="32" cy="16" r="4" opacity="0.8" />
                <circle cx="16" cy="32" r="4" opacity="0.7" />
                <circle cx="32" cy="32" r="5" opacity="0.85" />
                <circle cx="24" cy="8" r="2" opacity="1" />
                <circle cx="8" cy="24" r="2" opacity="0.9" />
                <circle cx="40" cy="24" r="2" opacity="0.9" />
                <circle cx="24" cy="40" r="2" opacity="1" />
                <circle cx="8" cy="8" r="1" opacity="0.6" />
                <circle cx="40" cy="8" r="1" opacity="0.6" />
                <circle cx="8" cy="40" r="1" opacity="0.6" />
                <circle cx="40" cy="40" r="1" opacity="0.6" />
              </svg>
            </div>
            <Link
              to="/"
              style={{ textDecoration: "none", color: "inherit" }}
              className="font-bold"
            >
              Glossy Touch
            </Link>
          </div>

          {/* Nav Links OR User Menu */}
          <div className="relative">
            {isAuthenticated ? (
              <div className="nav-links flex gap-4 items-center">
                <Link
                  to="/"
                  className={activePage === "/" ? "active" : ""}
                >
                  Home
                </Link>
              
                <Link
                  to="/questions-bank"
                  className={activePage === "/books" ? "active" : ""}
                >
                  Books
                </Link>
                
                <Link
                  to="/random-questions"
                  className={activePage === "/kcse" ? "active" : ""}
                >
                  KCSE
                </Link>
                              
                <Link
                  to="/dashboard"
                  className={activePage === "/dashboard" ? "active" : ""}
                >
                  Dashboard
                </Link>
                <div className="user-menu flex items-center gap-2">
                  <span className="text-white text-sm">
                    Welcome, {user?.first_name || user?.email}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="logout-btn px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="nav-links flex gap-4">
                <Link
                  to="/"
                  className={activePage === "/" ? "active" : ""}
                >
                  Home
                </Link>
            
                <Link
                  to="/books"
                  className={activePage === "/books" ? "active" : ""}
                >
                  Books
                </Link>
                <Link
                  to="/kcse"
                  className={activePage === "/kcse" ? "active" : ""}
                >
                  KCSE
                </Link>
                <Link
                  to="#"
                  className={activePage === "#" ? "active" : ""}
                >
                  CPA
                </Link>

                {/* <Link
                  to="/login"
                  className={activePage === "/login" ? "active" : ""}
                >
                  Login
                </Link> */}
            
                
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
