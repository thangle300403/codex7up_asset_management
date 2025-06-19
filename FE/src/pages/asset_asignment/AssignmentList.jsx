import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Box } from "../../components/Box";
import Pagination from "../../components/Pagination";

const AssignmentList = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;

  const fetchAssignments = async (page) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:3000/api/assignments?page=${page}&limit=${limit}`
      );
      setAssignments(res.data.items);
      setTotalPages(res.data.totalPages);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching assignments:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments(currentPage);
  }, [currentPage]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      axios
        .delete(`http://localhost:3000/api/assignments/${id}`)
        .then(() => {
          alert("Assignment deleted!");
          fetchAssignments(currentPage);
        })
        .catch((err) => {
          alert(err.response?.data?.message || "Delete failed");
        });
    }
  };

  if (loading) return <p>Loading assignments...</p>;

  return (
    <div style={{ padding: "20px", minHeight: "100vh", backgroundColor: "#f4f4f4" }}>
      {/* Header */}
      <div
        style={{
          marginBottom: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ color: "#2c3e50" }}>Asset Assignments</h1>
        <Link to="/assignments/add">
          <button
            style={{
              padding: "8px 16px",
              fontWeight: "bold",
              backgroundColor: "#3498db",
              color: "white",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Add Assignment
          </button>
        </Link>
      </div>

      {/* White Form that contains all Boxes */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert("Form submitted!");
        }}
        style={{
          backgroundColor: "white",
          padding: "24px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          minHeight: "50vh",
        }}
      >
        {assignments.length === 0 ? (
          <p>No assignments found.</p>
        ) : (
          assignments.map((a) => (
            <Box
              key={a.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
                width: "calc(50% - 8px)",
                boxSizing: "border-box",
                padding: "16px",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  className="title"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "8px",
                    color: "#2c3e50",
                  }}
                >
                  <h3>
                    <strong>ID:</strong> {a.id}
                  </h3>
                  <h3>
                    <strong>Asset:</strong> {a.asset}
                  </h3>
                  <div
                    className="buttons-container"
                    style={{
                      display: "flex",
                      gap: "8px",
                      marginTop: "8px",
                      justifyContent: "center",
                    }}
                  >
                    <Link to={`/assignments/edit/${a.id}`}>
                      <button
                        type="button"
                        style={{
                          padding: "8px 16px",
                          backgroundColor: "#4CAF50",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                        }}
                      >
                        Edit
                      </button>
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(a.id)}
                      style={{
                        border: "none",
                        backgroundColor: "#ff4d4d",
                        color: "white",
                        padding: "8px 16px",
                        borderRadius: "4px",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="description">
                  <p>
                    <strong>Department:</strong> {a.department}
                  </p>
                  <p>
                    <strong>Assigned Date:</strong>{" "}
                    {new Date(a.assigned_date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Box>
          ))
        )}
      </form>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default AssignmentList;
