import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSearch } from "../../context/SearchContext"; 

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  const { searchTerm } = useSearch(); 

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/departments")
      .then((res) => {
        setDepartments(res.data);
      })
      .catch((err) => {
        console.error("Error fetching departments:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      axios
        .delete(`http://localhost:3000/api/departments/${id}`)
        .then(() => {
          alert("Department deleted!");
          // Update state instead of reload
          setDepartments((prev) => prev.filter((d) => d.id !== id));
        })
        .catch((err) => {
          alert(err.response?.data?.message || "Delete failed");
        });
    }
  };

  // Filter departments by search term
  const filteredDepartments = departments.filter((d) =>
    (d.name || "").toLowerCase().includes((searchTerm || "").toLowerCase())
  );

  if (loading) return <p>Loading departments...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Department List</h2>

      {/* Add Department Button */}
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
            <th>Actions</th> {/* Add actions header */}
          </tr>
        </thead>
        <tbody>
          {filteredDepartments.length === 0 ? (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
                No departments found.
              </td>
            </tr>
          ) : (
            filteredDepartments.map((d) => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.name}</td>
                <td>
                  <Link to={`/departments/edit/${d.id}`}>
                    <button>Edit</button>
                  </Link>
                  <button
                    onClick={() => handleDelete(d.id)}
                    style={{ marginLeft: "8px" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentList;
