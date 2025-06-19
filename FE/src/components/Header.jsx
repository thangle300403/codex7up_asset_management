// components/Header.jsx
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSearch } from "../context/SearchContext"; // ✅ only if using SearchContext
import "./Header.css";

const Header = () => {
  // ✅ Use context if you have SearchContext:
  const { searchTerm, setSearchTerm } = useSearch(); 

  return (
    <header className="header">
      <nav
        className="navbar"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="navbar-brand">
          <h1 style={{ fontSize: "30px" }}>
            <Link
              to="/"
              style={{
                color: "white",
                textDecoration: "none",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src="/home.png"
                alt="Home"
                style={{ height: "30px", marginRight: "10px" }}
              />
              ASSET MANAGER
            </Link>
          </h1>
        </div>

        <div
          className="navbar-right"
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%", // ✅ corrected capital 'Width'
          }}
        >
          <input
            type="text"
            placeholder="🔍 Search for anything..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              height: 40,
              marginLeft: "10px",
              padding: "0 10px",
              paddingRight: "30px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />

          <ul
            className="nav-links"
            style={{
              display: "flex",
              listStyle: "none",
              marginLeft: "20px",
              gap: "20px",
            }}
          >
            <li>
              <NavLink
                to="/assets"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Assets
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/assignments"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Assignments
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/departments"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Departments
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/statuses"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Statuses
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
