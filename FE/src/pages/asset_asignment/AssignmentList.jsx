import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Box } from "../../components/box";

const AssignmentList = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch assignments
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/assignments")
      .then((res) => {
        setAssignments(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching assignments:", err);
        setLoading(false);
      });
  }, []);

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      axios
        .delete(`http://localhost:3000/api/assignments/${id}`)
        .then(() => {
          alert("Assignment deleted!");
          setAssignments((prev) => prev.filter((a) => a.id !== id));
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
          <button style={{ padding: "8px 16px", fontWeight: "bold", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "4px" }}>
            Add Assignment
          </button>
        </Link>
      </div>

      <div className="assignment-list" style={{ display: "flex", flexDirection: "row", gap: "16px" }}>
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
              width: "100%",  
            }}
          >
            <div style={{ display: "flex", flexDirection: "column"}}>
              <div className="title" style={{ display: "flex", flexDirection: "row" }}>
                <h3><strong>ID:</strong> {a.id}</h3>
                <h3><strong>Asset:</strong> {a.asset}</h3>
                <div className="buttons-container" style={{alignItems: "center", display: "flex", flexDirection: "row", gap: "8px", paddingLeft: "8px"}}>
                  <Link to={`/assignments/edit/${a.id}`}>
                    <button style={{ padding: "8px 16px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "4px" }}>
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(a.id)}
                    style={{border: "none", backgroundColor: "#ff4d4d", color: "white", padding: "8px 16px", borderRadius: "4px" }}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="discription" style={{ }}>
                <p><strong>Department:</strong> {a.department}</p>
                <p><strong>Assigned Date:</strong> {new Date(a.assigned_date).toLocaleDateString()}</p>
              </div>
            </div>
            <div style={{}}>
              
            </div>
          </Box>
        ))
      )}
      </div>
    </div>
  );
};

export default AssignmentList;
