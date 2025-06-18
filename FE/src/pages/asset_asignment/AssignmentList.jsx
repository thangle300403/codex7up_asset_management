import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Box } from "../../component/Box";
import Pagination from "../../component/Pagination";

const AssignmentList = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

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
    <div style={{ padding: "20px" }}>
      <h1>Asset Assignments</h1>

      <div style={{ marginBottom: "16px" }}>
        <Link to="/assignments/add">
          <button
            style={{
              padding: "8px 16px",
              fontWeight: "bold",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Add Assignment
          </button>
        </Link>
      </div>

      <div
        className="assignment-list"
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "16px",
          flexWrap: "wrap",
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
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h3>
                    <strong>ID:</strong> {a.id}
                  </h3>
                  <h3>
                    <strong>Asset:</strong> {a.asset}
                  </h3>
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
                <div
                  className="buttons-container"
                  style={{ display: "flex", gap: "8px", marginTop: "8px" }}
                >
                  <Link to={`/assignments/edit/${a.id}`}>
                    <button
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
            </Box>
          ))
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default AssignmentList;
