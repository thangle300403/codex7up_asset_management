import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Pagination from "../../component/Pagination";

const AssetList = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("search") || "";

  const fetchAssets = async (page = 1) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:3000/api/assets?page=${page}&limit=${limit}&search=${searchQuery}`
      );
      setAssets(res.data.items || []);
      setTotalPages(res.data.totalPages || 1);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching assets:", err);
      setAssets([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets(currentPage);
  }, [currentPage, searchQuery]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this asset?")) {
      axios
        .delete(`http://localhost:3000/api/assets/${id}`)
        .then(() => {
          alert("Asset deleted!");
          fetchAssets(currentPage); // Refresh after delete
        })
        .catch((err) => {
          alert(err.response?.data?.message || "Delete failed");
        });
    }
  };

  if (loading) return <p>Loading assets...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Asset List</h2>

      <div style={{ marginBottom: "16px" }}>
        <Link to="/assets/add">
          <button style={{ padding: "8px 16px", fontWeight: "bold" }}>
            ➕ Add Asset
          </button>
        </Link>
      </div>

      {assets.length === 0 ? (
        <p>No assets found.</p>
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
                <th>Description</th>
                <th>Department</th>
                <th>Status</th>
                <th>Actions</th>
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

export default AssetList;
