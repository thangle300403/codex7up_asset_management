import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddAssignment = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    asset_id: "",
    department_id: "",
    assigned_date: "",
  });

  const [assets, setAssets] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [assetsRes, deptsRes] = await Promise.all([
          axios.get("http://localhost:3000/api/assets"),
          axios.get("http://localhost:3000/api/departments"),
        ]);
        setAssets(assetsRes.data);
        setDepartments(deptsRes.data);
      } catch (err) {
        console.error("Error loading dropdown data:", err);
        alert("Failed to load asset or department list.");
      }
    };

    fetchOptions();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:3000/api/assignments/create", form);
      alert("✅ Assignment created successfully!");
      navigate("/assignments");
    } catch (err) {
      console.error("❌ Error creating assignment:", err);
      alert("Failed to create assignment.");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    page: {
      backgroundColor: "#f0f2f5",
      minHeight: "100vh",
      padding: "20px",
    },
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
    select: {
      width: "100%",
      padding: "12px 16px",
      borderRadius: "8px",
      border: "1px solid #e2e8f0",
      fontSize: "16px",
      backgroundColor: "#f8fafc",
      cursor: "pointer",
    },
    dateInput: {
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
    asterisk: {
      color: "#e53e3e",
      marginLeft: "4px",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>Add New Assignment</h2>
        </div>
        <form onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>
          <div style={styles.formGroup}>
            <label style={styles.label}>
              Asset <span style={styles.asterisk}>*</span>
            </label>
            <select
              name="asset_id"
              value={form.asset_id}
              onChange={handleChange}
              required
              style={styles.select}
            >
              <option value="">Select an asset</option>
              {assets.map((asset) => (
                <option key={asset.id} value={asset.id}>
                  {asset.name}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              Department <span style={styles.asterisk}>*</span>
            </label>
            <select
              name="department_id"
              value={form.department_id}
              onChange={handleChange}
              required
              style={styles.select}
            >
              <option value="">Select a department</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              Assigned Date <span style={styles.asterisk}>*</span>
            </label>
            <input
              type="date"
              name="assigned_date"
              value={form.assigned_date}
              onChange={handleChange}
              required
              style={styles.dateInput}
            />
          </div>

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Submitting..." : "➕ Add Assignment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAssignment;
