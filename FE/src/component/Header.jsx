// components/Header.jsx
import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div className="navbar-brand">
          <h1 style={{fontSize: "30px"}}><Link to="/"  style={{color: "white", textDecoration: "none", fontWeight: "bold"}} ><img src="/home.png" style={{fontSize: "30"}}/> ASSET MANAGER</Link></h1>
        </div>

        <div className="navbar-right" style={{ display: "flex", alignItems: "center", Width: "100%"}}>
          <input
            type="text"
            placeholder="🔍 Search for anything..."
            value={""}
            onChange={(e) => {}}
            style={{
              height: 40,
              marginLeft: "10px",
              padding: "0 10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />

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
                Departments
              </NavLink>
            </li>
            <li>
              <NavLink to="/statuses" activeClassName="active">
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
