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
        setAssignedDate(res.data.assigned_date?.substring(0, 10) || "");
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load assignment:", err);
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
      console.error("Update failed:", err);
      alert("❌ Update failed");
    }
  };

  const styles = {
    container: {
      maxWidth: "800px",
      margin: "40px auto",
      padding: "32px",
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    header: {
      marginBottom: "32px",
      borderBottom: "2px solid #f0f2f5",
      paddingBottom: "16px",
    },
    title: {
      fontSize: "28px",
      color: "#1a365d",
      fontWeight: "600",
      margin: "0",
    },
    formGroup: {
      marginBottom: "20px",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontSize: "14px",
      fontWeight: "500",
      color: "#4a5568",
    },
    input: {
      width: "100%",
      padding: "12px 16px",
      borderRadius: "8px",
      border: "1px solid #e2e8f0",
      fontSize: "16px",
      backgroundColor: "#f8fafc",
    },
    button: {
      backgroundColor: "#3182ce",
      color: "white",
      padding: "12px 24px",
      borderRadius: "8px",
      border: "none",
      fontSize: "16px",
      fontWeight: "500",
      cursor: "pointer",
      marginTop: "24px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <p style={{ textAlign: "center", color: "#4a5568" }}>Loading...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Edit Assignment Date</h2>
      </div>
      <form onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Assigned Date</label>
          <input
            type="date"
            value={assignedDate}
            onChange={(e) => setAssignedDate(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.button}>
          💾 Save Date
        </button>
      </form>
    </div>
  );
};

export default EditAssignment;
