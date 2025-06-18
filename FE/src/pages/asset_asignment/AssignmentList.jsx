import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../../component/Pagination";

const handleDelete = (id) => {
  if (window.confirm("Are you sure you want to delete this department?")) {
    axios
      .delete(`http://localhost:3000/api/assignments/${id}`)
      .then(() => {
        alert("Assignment deleted!");
        window.location.reload(); // Or update state
      })
      .catch((err) => {
        alert(err.response?.data?.message || "Delete failed");
      });
  }
};

const AssignmentList = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  useEffect(() => {
    console.log(`Fetching page: ${currentPage}`);
    fetch(
      `http://localhost:3000/api/assignments?page=${currentPage}&limit=${limit}`
    )
      .then((res) => res.json())
      .then((data) => {
        setAssignments(data.items);
        setTotalPages(data.totalPages);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch failed:", err);
        setLoading(false);
      });
  }, [currentPage]);

  if (loading) return <p>Loading assignments...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Asset Assignments</h2>

      <div style={{ marginBottom: "16px" }}>
        <Link to="/assignments/add">
          <button style={{ padding: "8px 16px", fontWeight: "bold" }}>
            ➕ Add Assignment
          </button>
        </Link>
      </div>

      {assignments.length === 0 ? (
        <p>No assignments found.</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          cellSpacing="0"
          style={{ width: "100%", borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Asset</th>
              <th>Department</th>
              <th>Assigned Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((a) => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.asset}</td>
                <td>{a.department}</td>
                <td>{new Date(a.assigned_date).toLocaleDateString()}</td>
                <td>
                  <Link to={`/assignments/edit/${a.id}`}>
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
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default AssignmentList;
