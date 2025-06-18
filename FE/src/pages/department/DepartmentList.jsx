import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
    <div style={{ padding: "20px" }}>
      <h2>Department List</h2>

      {/* ✅ Add Department Button */}
      <div style={{ marginBottom: "16px" }}>
        <Link to="/departments/add">
          <button style={{ padding: "8px 16px", fontWeight: "bold" }}>
            ➕ Add Department
          </button>
        </Link>
      </div>

      <table
        border="1"
        cellPadding="10"
        cellSpacing="0"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((a) => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.name}</td>
              <td>
                <Link to={`/departments/edit/${a.id}`}>
                  <button>Edit</button>
                </Link>
                <button
                  onClick={() => handleDelete(a.id)}
                  style={{ marginLeft: "8px" }}
                >
                  Delete
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
