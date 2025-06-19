import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Pagination from "../../component/Pagination";

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
    padding: "10px 28px",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
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
    marginBottom: "8px",
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    color: "white",
  },
};

const getStatusStyle = (status) => {
  switch (status) {
    case "In Use":
      return { backgroundColor: "#e3f2fd", color: "#1976d2" };
    case "In Repair":
      return { backgroundColor: "#ffebee", color: "#d32f2f" };
    default:
      return { backgroundColor: "#f5f5f5", color: "#757575" };
  }
};

const AssetList = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [statusList, setStatusList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("search") || "";
  const limit = 5;

  const fetchAssets = async (page = 1) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:3000/api/assets?page=${page}&limit=${limit}&search=${searchQuery}`
      );
      setAssets(res.data.items || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      setAssets([]);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchStatuses = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/statuses");
      setStatusList(res.data);
    } catch (err) {
      console.error("Failed to fetch statuses:", err);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this asset?")) {
      axios
        .delete(`http://localhost:3000/api/assets/${id}`)
        .then(() => {
          alert("Asset deleted!");
          fetchAssets(currentPage);
        })
        .catch((err) => {
          alert(err.response?.data?.message || "Delete failed");
        });
    }
  };

  useEffect(() => {
    fetchAssets(currentPage);
    fetchStatuses();
  }, [currentPage, searchQuery]);

  if (loading) {
    return (
      <div style={tableStyles.container}>
        <p style={{ textAlign: "center", color: "#2c3e50" }}>
          Loading assets...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={tableStyles.container}>
        <p style={{ textAlign: "center", color: "#e74c3c" }}>
          Error loading assets: {error}
        </p>
      </div>
    );
  }

  const filteredAssets = assets.filter((a) =>
    selectedStatus === "" ? true : a.currentStatus === selectedStatus
  );

  return (
    <div
      style={{
        backgroundColor: "#f4f4f4",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div style={tableStyles.container}>
        <div style={tableStyles.header}>
          <h2 style={tableStyles.title}>Asset Management</h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <Link to="/assets/add">
              <button style={tableStyles.addButton}>Add New Asset</button>
            </Link>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              style={{
                marginTop: "8px",
                padding: "8px 12px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                fontSize: "14px",
                minWidth: "160px",
              }}
            >
              <option value="">-- All Statuses --</option>
              {statusList.map((s) => (
                <option key={s.id} value={s.status_name}>
                  {s.status_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <table style={tableStyles.table}>
          <thead>
            <tr>
              <th style={tableStyles.th}>ID</th>
              <th style={tableStyles.th}>Name</th>
              <th style={tableStyles.th}>Description</th>
              <th style={tableStyles.th}>Department</th>
              <th style={tableStyles.th}>Status</th>
              <th style={tableStyles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssets.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No assets found for selected status.
                </td>
              </tr>
            ) : (
              filteredAssets.map((a) => (
                <tr key={a.id}>
                  <td style={tableStyles.td}>{a.id}</td>
                  <td style={tableStyles.td}>{a.name}</td>
                  <td style={tableStyles.td}>{a.description}</td>
                  <td style={tableStyles.td}>{a.department}</td>
                  <td style={tableStyles.td}>
                    <span
                      style={{
                        padding: "4px 8px",
                        borderRadius: "12px",
                        fontSize: "12px",
                        whiteSpace: "nowrap",
                        ...getStatusStyle(a.currentStatus),
                      }}
                    >
                      {a.currentStatus}
                    </span>
                  </td>
                  <td style={tableStyles.td}>
                    <Link to={`/assets/edit/${a.id}`}>
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

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default AssetList;
