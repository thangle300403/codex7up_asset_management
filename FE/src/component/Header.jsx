// components/Header.jsx
import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";
import axios from "axios";

const user = JSON.parse(localStorage.getItem("user"));

const Header = () => {
  const navigate = useNavigate();

  const [showExport, setShowExport] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");

  // Load departments only when export popup is shown
  useEffect(() => {
    if (showExport) {
      axios
        .get("http://localhost:3000/api/departments/all")
        .then((res) => setDepartments(res.data))
        .catch(() => alert("❌ Failed to load departments"));
    }
  }, [showExport]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  const handleExportAssets = () => {
    setShowExport(false);
    navigate(`/report/fill${selectedDept ? `?deptId=${selectedDept}` : ""}`);
  };

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
              }}
            >
              <img src="/home.png" style={{ fontSize: "30" }} /> ASSET MANAGER
            </Link>
          </h1>
        </div>

        {user ? (
          <div
            style={{
              marginLeft: "12px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span style={{ color: "white", marginRight: "10px" }}>
              👤 {user.name}
            </span>
            <button
              onClick={handleLogout}
              style={{
                padding: "6px 12px",
                backgroundColor: "#dc3545",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              🚪 Logout
            </button>
            <button
              onClick={handleExportAssets}
              style={{
                marginLeft: "12px",
                padding: "8px 14px",
                backgroundColor: "#17a2b8",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              📤 Export Report
            </button>
          </div>
        ) : (
          <Link to="/login">
            <button
              style={{
                marginLeft: "12px",
                padding: "6px 12px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              🔐 Login
            </button>
          </Link>
        )}

        {showExport && (
          <div
            style={{
              position: "absolute",
              top: "80px",
              right: "0px",
              background: "white",
              padding: "16px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              zIndex: 1000,
            }}
          >
            <label>
              <strong>Select Department:</strong>
            </label>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              style={{ padding: "8px", width: "100%", marginTop: "6px" }}
            >
              <option value="">-- Choose --</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>

            {/* <div
              style={{
                marginTop: "12px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <button onClick={() => setShowExport(false)}>Cancel</button>
              <button
                onClick={handleExportAssets}
                disabled={!selectedDept}
                style={{
                  backgroundColor: "#28a745",
                  color: "white",
                  padding: "6px 12px",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                Export JSON
              </button>
            </div> */}
          </div>
        )}

        <div
          className="navbar-right"
          style={{ display: "flex", alignItems: "center", Width: "100%"}}
        >
          <input
            type="text"
            placeholder="🔍 Search for anything..."
            value={""}
            onChange={(e) => {}}
            style={{
              height: 40,
              marginLeft: "10px",
              padding: "0 10px",
              paddingRight: "30px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />

          <ul className="nav-links" style={{ display: "flex", listStyle: "none", marginLeft: "20px" }}>
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
            <li>
              <NavLink to="/reports" activeClassName="active">
                Reports
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
