import { NavLink, Link } from "react-router-dom";
import {
  Wrench,
  Sun,
  Moon,
  BriefcaseBusiness,
  Menu,
  X,
} from "lucide-react";

function Navbar({
  theme,
  toggleTheme,
  mobileMenuOpen,
  setMobileMenuOpen,
  openAuth,
  user,
  handleLogout,
}) {
  return (
    <header className="navbar">
            <NavLink
        to="/"
        className="brand"
        aria-label="QuickServe home"
        onClick={() => setMobileMenuOpen(false)}
        >
        <span className="brand-icon">
          <Wrench size={23} strokeWidth={2.5} />
        </span>

        <span className="brand-name">
          Quick<span>Serve</span>
        </span>
        </NavLink>
        <nav className={`nav-links ${mobileMenuOpen ? "nav-open" : ""}`}>
      <NavLink to="/" onClick={() => setMobileMenuOpen(false)}>
        Home
      </NavLink>

      <NavLink to="/services" onClick={() => setMobileMenuOpen(false)}>
        Explore
      </NavLink>

      <Link to="/#how-it-works" onClick={() => setMobileMenuOpen(false)}>
        How It Works
      </Link>

      <Link to="/#about" onClick={() => setMobileMenuOpen(false)}>
        About
      </Link>
    </nav>

      <div className="nav-actions">
        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${
            theme === "light" ? "dark" : "light"
          } mode`}
          title={`Switch to ${
            theme === "light" ? "dark" : "light"
          } mode`}
        >
          {theme === "light" ? <Moon size={19} /> : <Sun size={19} />}

          <span>{theme === "light" ? "Dark" : "Light"}</span>
        </button>

          <Link to="/services" className="button button-primary nav-book">
          Book a Service
          </Link>

        <div className="auth-nav-actions">
        {user ? (
          <>
            <span className="auth-nav-login">
              Hi, {user.full_name.split(" ")[0]}
            </span>

            <button
              type="button"
              className="auth-nav-signup"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="auth-nav-login"
              onClick={() => openAuth("login", "customer")}
            >
              Login
            </button>

            <button
              type="button"
              className="auth-nav-signup"
              onClick={() => openAuth("signup", "customer")}
            >
              Sign Up
            </button>

            <button
              type="button"
              className="auth-provider-link"
              onClick={() => openAuth("signup", "provider")}
            >
              <BriefcaseBusiness size={16} />
              <span>Become a Provider</span>
            </button>
          </>
        )}
        </div>
      </div>
    </header>
  );
}
export default Navbar;