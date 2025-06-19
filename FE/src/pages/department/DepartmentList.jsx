import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const styles = {
  container: {
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto", // Center the container
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "24px",
    color: "#333",
    margin: 0,
  },
  addButton: {
    backgroundColor: "cyan",
    color: "black",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
    textDecoration: "none", // Remove underline from link
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  th: {
    backgroundColor: "#f2f2f2",
    padding: "12px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #ddd",
  },

  actionButton: {
    padding: "6px 12px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "8px",
  },
  deleteButton: {
    padding: "6px 12px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },

};

const handleDelete = (id) => {
  if (window.confirm("Are you sure you want to delete this department?")) {
    axios
      .delete(`http://localhost:3000/api/departments/${id}`)
      .then(() => {
        alert("Department deleted!");
        window.location.reload(); // Or update state
      })
      .catch((err) => {
        alert(err.response?.data?.message || "Delete failed");
      });
  }
};

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/departments")
      .then((res) => {
        setDepartments(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching departments:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading departments...</p>;

  return (
    <div style={{ ...styles.container }}>
      <div style={{ ...styles.header }}>
        <h1 style={{ ...styles.title }}>Departments</h1>
        <Link to="/departments/add" style={{ ...styles.addButton }}>
          ➕ Add Department
        </Link>
      </div>
      <table style={{ ...styles.table }}>
        <thead>
          <tr>
            <th style={{ ...styles.th }}>ID</th>
            <th style={{ ...styles.th }}>Name</th>
            <th style={{ ...styles.th }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.id}>
              <td style={{ ...styles.td }}>{department.id}</td>
              <td style={{ ...styles.td }}>{department.name}</td>
              <td style={{ ...styles.td }}>
                <Link to={`/departments/edit/${department.id}`}>
                  <button style={{ ...styles.actionButton }}>📝 Edit</button>
                </Link>
                <button
                  onClick={() => handleDelete(department.id)}
                  style={{ ...styles.deleteButton }}
                >
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentList;
