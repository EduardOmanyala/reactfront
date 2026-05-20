import { Link, useLocation } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import BASE_URL from "../Config";
import { authFetch } from "../api/auth";
import './gen.css';
import { FaUserCircle } from "react-icons/fa";
import { FaBell } from "react-icons/fa";

const UNREAD_NOTIFICATION_URLS = [
  `${BASE_URL}/notifications/unread/`,
  `${BASE_URL}/api/notifications/unread/`,
];

const MARK_READ_URLS = [
  `${BASE_URL}/notifications/mark-read/`,
  `${BASE_URL}/api/notifications/mark-read/`,
];

const ALL_NOTIFICATIONS_URLS = [
  `${BASE_URL}/notifications/get-all/`,
  `${BASE_URL}/api/notifications/get-all/`,
];

const requestNotificationsEndpoint = async (urls, options) => {
  for (const url of urls) {
    const response = await authFetch(url, options);
    if (response.ok) return response;
    if (response.status !== 404) return response;
  }
  throw new Error("Notifications endpoint not found");
};

export default function Header() {
  const location = useLocation();
  const activePage = location.pathname;
  const { logout, isAuthenticated } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState([]);
  const [allNotifications, setAllNotifications] = useState([]);
  const profileMenuRef = useRef(null);
  const notificationsMenuRef = useRef(null);

  const notificationCount = unreadNotifications.length;
  const fetchUnreadNotifications = useCallback(async () => {
    try {
      const response = await requestNotificationsEndpoint(UNREAD_NOTIFICATION_URLS, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch unread notifications");
      }

      const data = await response.json();
      setUnreadNotifications(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching unread notifications:", error);
      setUnreadNotifications([]);
    }
  }, []);

  const markNotificationsAsRead = async () => {
    try {
      const response = await requestNotificationsEndpoint(MARK_READ_URLS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to mark notifications as read");
      }

      setUnreadNotifications([]);
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  };

  const fetchAllNotifications = async () => {
    try {
      const response = await requestNotificationsEndpoint(ALL_NOTIFICATIONS_URLS, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch all notifications");
      }

      const data = await response.json();
      setAllNotifications(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching all notifications:", error);
      setAllNotifications([]);
    }
  };

  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return "";
    const createdTime = new Date(timestamp).getTime();
    if (Number.isNaN(createdTime)) return "";

    const seconds = Math.max(0, Math.floor((Date.now() - createdTime) / 1000));
    if (seconds < 60) return "just now";

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min${minutes === 1 ? "" : "s"} ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hr${hours === 1 ? "" : "s"} ago`;

    const days = Math.floor(hours / 24);
    return `${days} day${days === 1 ? "" : "s"} ago`;
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileOpen(false);
      }

      if (
        notificationsMenuRef.current &&
        !notificationsMenuRef.current.contains(event.target)
      ) {
        setNotificationsOpen(false);
      }
    };

    if (profileOpen || notificationsOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [profileOpen, notificationsOpen]);

  useEffect(() => {
    if (!isAuthenticated) {
      setUnreadNotifications([]);
      setAllNotifications([]);
      return;
    }

    // Fetch once when authenticated (no interval polling).
    fetchUnreadNotifications();
  }, [fetchUnreadNotifications, isAuthenticated]);

  const handleLogout = async () => {
    setProfileOpen(false);
    setNotificationsOpen(false);
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
                    to="/posts/"
                    className={activePage === "/books" ? "active" : ""}
                  >
                    Blog
                  </Link>
                
                  <Link
                    to="/books"
                    className={activePage === "/books" ? "active" : ""}
                  >
                    Books
                  </Link>

                   <Link
                    to="/study"
                    className={activePage === "#" ? "active" : ""}
                  >
                    Study
                  </Link>
                  
                  <Link
                    to="/finance/"
                    className={activePage === "/finance/mmf/kenya" ? "active" : ""}
                  >
                    Markets
                  </Link>
                                
                  {/* <Link
                    to="/dashboard"
                    className={activePage === "/dashboard" ? "active" : ""}
                  >
                    Dashboard
                  </Link> */}

                   <div className="user-menu flex items-center gap-2" ref={notificationsMenuRef}>
                    <button
                      type="button"
                      className="profile-icon-btn"
                      aria-haspopup="menu"
                      aria-expanded={notificationsOpen}
                      aria-label="Open notifications menu"
                      onClick={async () => {
                        const shouldOpen = !notificationsOpen;
                        setNotificationsOpen(shouldOpen);
                        setProfileOpen(false);

                        if (shouldOpen) {
                          await fetchAllNotifications();
                        }

                        if (shouldOpen && notificationCount > 0) {
                          await markNotificationsAsRead();
                        }
                      }}
                    >
                      <FaBell  size={25} className="profile-icon" />
                      {notificationCount > 0 && (
                        <span className="notification-count">{notificationCount}</span>
                      )}
                    </button>
                    {notificationsOpen && (
                      <div className="main-dropdwn" role="menu">
                        {allNotifications.length > 0 ? (
                          allNotifications.map((notification) => {
                            const bookId = notification.book_id ?? notification.book;
                            const bookSlug = notification.book_slug;
                            const notificationPath = bookId && bookSlug
                              ? `/books/${bookId}/${bookSlug}`
                              : "/books";

                            return (
                              <Link
                              key={notification.id}
                              className="user-dropdown-item"
                              role="menuitem"
                              to={notificationPath}
                              onClick={() => setNotificationsOpen(false)}
                            >
                              <div style={{ fontSize: "0.82rem", lineHeight: 1.3 }}>
                                {notification.text || "New notification"}
                              </div>
                              <div style={{ fontSize: "0.72rem", opacity: 0.75, marginTop: "0.2rem" }}>
                                {formatTimeAgo(notification.created_at)}
                              </div>
                            </Link>
                            );
                          })
                        ) : (
                          <div className="user-dropdown-item" role="menuitem">
                            No notifications
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="user-menu flex items-center gap-2" ref={profileMenuRef}>
                    <button
                      type="button"
                      className="profile-icon-btn"
                      aria-haspopup="menu"
                      aria-expanded={profileOpen}
                      aria-label="Open profile menu"
                      onClick={() => {
                        setProfileOpen((prev) => !prev);
                        setNotificationsOpen(false);
                      }}
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
                    to="/posts/"
                    className={activePage === "/books" ? "active" : ""}
                  >
                    Blog
                  </Link>
              
                  <Link
                    to="/books"
                    className={activePage === "/books" ? "active" : ""}
                  >
                    Books
                  </Link>
                  <Link
                    to="/finance/"
                    className={activePage === "/finance/mmf/kenya" ? "active" : ""}
                  >
                    Markets
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
                    to="/posts/"
                    className={activePage === "/books" ? "active" : ""}
                  >
                    Blog
            </Link>
          
            <Link
              to="/books"
              className={activePage === "/books" ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              Books
            </Link>
            
            <Link
              to="/finance/"
              className={activePage === "/finance/mmf/kenya" ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              Markets
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
                    to="/posts/"
                    className={activePage === "/books" ? "active" : ""}
                  >
                    Blog
                  </Link>
        
            <Link
              to="/books"
              className={activePage === "/books" ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              Books
            </Link>
            <Link
              to="/finance/"
              className={activePage === "/finance/mmf/kenya" ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              Markets
            </Link>
            <Link
              to="/study"
              className={activePage === "#" ? "active" : ""}
              onClick={() => setMenuOpen(false)}
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
    </>
  );
}
