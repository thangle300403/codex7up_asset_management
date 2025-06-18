import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const handleDelete = (id) => {
  if (window.confirm("Are you sure you want to delete this status?")) {
    axios
      .delete(`http://localhost:3000/api/statuses/${id}`)
      .then(() => {
        alert("Status deleted!");
        window.location.reload(); // Or update state
      })
      .catch((err) => {
        alert(err.response?.data?.message || "Delete failed");
      });
  }
};

const StatusList = () => {
  const [statuses, setStatuss] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/statuses")
      .then((res) => {
        setStatuss(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching statuses:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading statuses...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Status List</h2>

      {/* ✅ Add Status Button */}
      <div style={{ marginBottom: "16px" }}>
        <Link to="/statuses/add">
          <button style={{ padding: "8px 16px", fontWeight: "bold" }}>
            ➕ Add Status
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
          {statuses.map((a) => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.status_name}</td>
              <td>
                <Link to={`/statuses/edit/${a.id}`}>
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

export default StatusList;
