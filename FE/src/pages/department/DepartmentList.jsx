import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../../component/Pagination";
import { useSearch } from "../../context/SearchContext";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  const { searchTerm } = useSearch();

  const fetchDepartments = async (page) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:3000/api/departments?page=${page}&limit=${limit}`
      );
      setDepartments(res.data.items);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Error fetching departments:", err);
    } finally {
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
          setDepartments((prev) => prev.filter((d) => d.id !== id));
        })
        .catch((err) => {
          alert(err.response?.data?.message || "Delete failed");
        });
    }
  };

  const filteredDepartments = departments.filter((d) =>
    (d.name || "").toLowerCase().includes((searchTerm || "").toLowerCase())
  );

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

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default DepartmentList;
