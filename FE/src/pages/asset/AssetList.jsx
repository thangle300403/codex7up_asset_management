import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const handleDelete = (id) => {
  if (window.confirm("Are you sure you want to delete this asset?")) {
    axios
      .delete(`http://localhost:3000/api/assets/${id}`)
      .then(() => {
        alert("Asset deleted!");
        window.location.reload(); // Or update state
      })
      .catch((err) => {
        alert(err.response?.data?.message || "Delete failed");
      });
  }
};

const AssetList = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/assets")
      .then((res) => {
        setAssets(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching assets:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading assets...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Asset List</h2>

      {/* ✅ Add Asset Button */}
      <div style={{ marginBottom: "16px" }}>
        <Link to="/assets/add">
          <button style={{ padding: "8px 16px", fontWeight: "bold" }}>
            ➕ Add Asset
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
            <th>Description</th>
            <th>Department</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((a) => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.name}</td>
              <td>{a.description}</td>
              <td>{a.department}</td>
              <td>{a.currentStatus}</td>
              <td>
                <Link to={`/assets/edit/${a.id}`}>
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

export default AssetList;
