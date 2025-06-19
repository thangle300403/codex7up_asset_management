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
    // <div style={{ padding: "20px" }}>
    //   <h2>Status List</h2>

    //   {/* ✅ Add Status Button */}
    //   <div style={{ marginBottom: "16px" }}>
    //     <Link to="/statuses/add">
    //       <button style={{ padding: "8px 16px", fontWeight: "bold" }}>
    //         ➕ Add Status
    //       </button>
    //     </Link>
    //   </div>

    //   <table
    //     border="1"
    //     cellPadding="10"
    //     cellSpacing="0"
    //     style={{ width: "100%", borderCollapse: "collapse" }}
    //   >
    //     <thead>
    //       <tr>
    //         <th>ID</th>
    //         <th>Name</th>
    //         <th>Actions</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {statuses.map((a) => (
    //         <tr key={a.id}>
    //           <td>{a.id}</td>
    //           <td>{a.status_name}</td>
    //           <td>
    //             <Link to={`/statuses/edit/${a.id}`}>
    //               <button>Edit</button>
    //             </Link>
    //             <button
    //               onClick={() => handleDelete(a.id)}
    //               style={{ marginLeft: "8px" }}
    //             >
    //               Delete
    //             </button>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
    <div style={{ backgroundColor: "#f4f4f4", minHeight: "100vh", padding: "20px" }}>
      <div style={tableStyles.container}>
        {/* Header */}
        <div style={tableStyles.header}>
          <h2 style={tableStyles.title}>📋 Status List</h2>
          <Link to="/statuses/add" style={{ textDecoration: "none" }}>
            <button style={tableStyles.addButton}>➕ Add Status</button>
          </Link>
        </div>

        {/* Table */}
        <table style={tableStyles.table}>
          <thead>
            <tr>
              <th style={tableStyles.th}>ID</th>
              <th style={tableStyles.th}>Name</th>
              <th style={tableStyles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {statuses.length === 0 ? (
              <tr>
                <td colSpan="3" style={{ padding: "16px", textAlign: "center" }}>
                  No statuses found.
                </td>
              </tr>
            ) : (
              statuses.map((a, index) => (
                <tr
                  key={a.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                  }}
                >
                  <td style={tableStyles.td}>{a.id}</td>
                  <td style={tableStyles.td}>{a.status_name}</td>
                  <td style={tableStyles.td}>
                    <Link to={`/statuses/edit/${a.id}`}>
                      <button
                        style={{
                          ...tableStyles.actionButton,
                          ...tableStyles.editButton,
                        }}
                      >
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(a.id)}
                      style={{
                        ...tableStyles.actionButton,
                        ...tableStyles.deleteButton,
                      }}
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
    </div>
  );
};

const tableStyles = {
  container: {
    padding: "32px",
    maxWidth: "1200px",
    margin: "0 auto",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },
  title: {
    fontSize: "24px",
    color: "#2c3e50",
    margin: 0,
  },
  addButton: {
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    transition: "background-color 0.2s",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    overflow: "hidden",
  },
  th: {
    backgroundColor: "#f8f9fa",
    padding: "12px 16px",
    textAlign: "left",
    color: "#2c3e50",
    fontWeight: "600",
    borderBottom: "2px solid #e9ecef",
  },
  td: {
    padding: "12px 16px",
    borderBottom: "1px solid #e9ecef",
    color: "#2c3e50",
  },
  actionButton: {
    padding: "6px 12px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.2s",
  },
  editButton: {
    backgroundColor: "#2ecc71",
    color: "white",
    marginRight: "8px",
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    color: "white",
  },
};

export default StatusList;
