import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditAssignment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [assignedDate, setAssignedDate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/assignments/${id}`)
      .then((res) => {
        setAssignedDate(res.data.assigned_date?.substring(0, 10) || ""); // format YYYY-MM-DD
        setLoading(false);
      })
      .catch((err) => {
        alert("Failed to load assignment");
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/assignments/${id}`, {
        assigned_date: assignedDate,
      });
      alert("✅ Assignment updated!");
      navigate("/assignments");
    } catch (err) {
      alert("❌ Update failed");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Assignment Date</h2>
      <form onSubmit={handleSubmit}>
        <label>Assigned Date:</label>
        <br />
        <input
          type="date"
          value={assignedDate}
          onChange={(e) => setAssignedDate(e.target.value)}
          required
        />
        <br />
        <button type="submit" style={{ marginTop: "12px" }}>
          💾 Save Date
        </button>
      </form>
    </div>
  );
};

export default EditAssignment;
