import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const location = useLocation();
  const activePage = location.pathname;
  const { user, logout, isAuthenticated } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
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

            {/* Desktop Navigation */}
            <div className="desktop-nav">
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
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="mobile-menu-btn"
              onClick={toggleMenu}
              aria-label="Toggle mobile menu"
            >
              <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
              <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
              <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay - Outside of header container */}
      {menuOpen && (
        <div 
          className="mobile-menu-overlay"
          onClick={closeMenu}
        ></div>
      )}

      {/* Mobile Navigation - Outside of header container */}
      <div className={`mobile-nav ${menuOpen ? 'open' : ''}`}>
        {isAuthenticated ? (
          <div className="mobile-nav-links">
            <Link
              to="/"
              className={activePage === "/" ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
          
            <Link
              to="/questions-bank"
              className={activePage === "/books" ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              Books
            </Link>
            
            <Link
              to="/random-questions"
              className={activePage === "/kcse" ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              KCSE
            </Link>
                          
            <Link
              to="/dashboard"
              className={activePage === "/dashboard" ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>
            <div className="mobile-user-menu">
              <div className="user-welcome">
                Welcome, {user?.first_name || user?.email}
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="mobile-logout-btn"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="mobile-nav-links">
            <Link
              to="/"
              className={activePage === "/" ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
        
            <Link
              to="/books"
              className={activePage === "/books" ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              Books
            </Link>
            <Link
              to="/kcse"
              className={activePage === "/kcse" ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              KCSE
            </Link>
            <Link
              to="#"
              className={activePage === "#" ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              CPA
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
