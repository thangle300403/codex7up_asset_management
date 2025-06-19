import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../../component/Pagination";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  const fetchDepartments = async (page) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:3000/api/departments?page=${page}&limit=${limit}`
      );
      setDepartments(res.data.items);
      setTotalPages(res.data.totalPages);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching departments:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments(currentPage);
  }, [currentPage]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      axios
        .delete(`http://localhost:3000/api/departments/${id}`)
        .then(() => {
          alert("Department deleted!");
          fetchDepartments(currentPage); // refresh current page
        })
        .catch((err) => {
          alert(err.response?.data?.message || "Delete failed");
        });
    }
  };

  if (loading) return <p>Loading departments...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Department List</h2>

      <div style={{ marginBottom: "16px" }}>
        <Link to="/departments/add">
          <button style={{ padding: "8px 16px", fontWeight: "bold" }}>
            ➕ Add Department
          </button>
        </Link>
      </div>

      {departments.length === 0 ? (
        <p>No departments found.</p>
      ) : (
        <>
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((d) => (
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
              ))}
            </tbody>
          </table>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      )}
    </div>
  );
};

export default DepartmentList;
