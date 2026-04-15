import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import './gen.css';
import { FaUserCircle } from "react-icons/fa";

export default function Header() {
  const location = useLocation();
  const activePage = location.pathname;
  const { logout, isAuthenticated } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileMenuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    if (profileOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [profileOpen]);

  const handleLogout = async () => {
    setProfileOpen(false);
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
                Kenlib
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="desktop-nav">
              {isAuthenticated ? (
                <div className="nav-links flex gap-4 items-center">
                  {/* <Link
                    to="/"
                    className={activePage === "/" ? "active" : ""}
                  >
                    Home
                  </Link> */}
                
                  <Link
                    to="/questions-bank"
                    className={activePage === "/books" ? "active" : ""}
                  >
                    Books
                  </Link>
                  
                  <Link
                    to="/finance/mmf/kenya"
                    className={activePage === "/finance/mmf/kenya" ? "active" : ""}
                  >
                    Finance
                  </Link>
                                
                  {/* <Link
                    to="/dashboard"
                    className={activePage === "/dashboard" ? "active" : ""}
                  >
                    Dashboard
                  </Link> */}
                  <div className="user-menu flex items-center gap-2" ref={profileMenuRef}>
                    <button
                      type="button"
                      className="profile-icon-btn"
                      aria-haspopup="menu"
                      aria-expanded={profileOpen}
                      aria-label="Open profile menu"
                      onClick={() => setProfileOpen((prev) => !prev)}
                    >
                      <FaUserCircle size={27} className="profile-icon" />
                    </button>
                    {profileOpen && (
                      <div className="main-dropdwn" role="menu">
                        <Link
                          to="/dashboard"
                          className="user-dropdown-item"
                          role="menuitem"
                          onClick={() => setProfileOpen(false)}
                        >
                          Profile
                        </Link>
                        <Link
                          to="/books"
                          className="user-dropdown-item"
                          role="menuitem"
                          onClick={() => setProfileOpen(false)}
                        >
                          Purchases
                        </Link>
                        <button
                          type="button"
                          className="user-dropdown-item user-dropdown-item-danger"
                          role="menuitem"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="nav-links flex gap-4">
                  {/* <Link
                    to="/"
                    className={activePage === "/" ? "active" : ""}
                  >
                    Home
                  </Link> */}
              
                  <Link
                    to="/books"
                    className={activePage === "/books" ? "active" : ""}
                  >
                    Books
                  </Link>
                  <Link
                    to="/finance/mmf/kenya"
                    className={activePage === "/finance/mmf/kenya" ? "active" : ""}
                  >
                    Finance
                  </Link>
                  <Link
                    to="/study"
                    className={activePage === "#" ? "active" : ""}
                  >
                    Study
                  </Link>
                   <Link
                    to="/login"
                    className={activePage === "#" ? "active" : ""}
                  >
                    Sign In
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
            {/* <Link
              to="/"
              className={activePage === "/" ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link> */}
          
            <Link
              to="/books"
              className={activePage === "/books" ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              Books
            </Link>
            
            <Link
              to="/finance/mmf/kenya"
              className={activePage === "/finance/mmf/kenya" ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              Finance
            </Link>
                          
            <Link
              to="/study"
              className={activePage === "/study" ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              Study
            </Link>
            <div className="mobile-user-menu">
              {/* <div className="user-welcome">
                Welcome, {user?.first_name || user?.email}
              </div> */}
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
            {/* <Link
              to="/"
              className={activePage === "/" ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link> */}
        
            <Link
              to="/books"
              className={activePage === "/books" ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              Books
            </Link>
            <Link
              to="/finance/mmf/kenya"
              className={activePage === "/finance/mmf/kenya" ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              Finance
            </Link>
            <Link
              to="/study"
              className={activePage === "#" ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              Study
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
