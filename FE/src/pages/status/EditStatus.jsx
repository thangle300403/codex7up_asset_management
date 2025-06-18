import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditStatus = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [statusName, setStatusName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/statuses/${id}`)
      .then((res) => {
        setStatusName(res.data.status_name || "");
        setLoading(false);
      })
      .catch((err) => {
        alert("❌ Failed to fetch status info");
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/api/statuses/${id}`, {
        status_name: statusName,
      })
      .then(() => {
        alert("✅ Status updated successfully");
        navigate("/statuses");
      })
      .catch((err) => {
        alert("❌ Update failed");
      });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Status</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Status Name:</label>
          <br />
          <input
            type="text"
            value={statusName}
            onChange={(e) => setStatusName(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>
          ✅ Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditStatus;
