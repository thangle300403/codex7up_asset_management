// components/Header.jsx
import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/">🏠 Asset Manager</Link>
        </div>
        <ul className="nav-links">
          <li>
            <NavLink to="/assets" activeClassName="active">
              Assets
            </NavLink>
          </li>
          <li>
            <NavLink to="/assignments" activeClassName="active">
              Assignments
            </NavLink>
          </li>
          <li>
            <NavLink to="/departments" activeClassName="active">
              Assignments
            </NavLink>
          </li>
          <li>
            <NavLink to="/statuses" activeClassName="active">
              Statuses
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
