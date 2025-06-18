import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddAsset = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    department_id: "",
    status_id: "",
    assigned_date: "",
    checked_at: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/api/assets/create", formData);
      alert("✅ Asset added successfully!");
      navigate("/assets");
    } catch (err) {
      console.error("❌ Error adding asset:", err);
      alert("Failed to add asset.");
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
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
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
      transition: "all 0.2s ease",
    },
    textarea: {
      width: "100%",
      padding: "12px 16px",
      borderRadius: "8px",
      border: "1px solid #e2e8f0",
      fontSize: "16px",
      backgroundColor: "#f8fafc",
      minHeight: "120px",
      resize: "vertical",
    },
    select: {
      width: "100%",
      padding: "12px 16px",
      borderRadius: "8px",
      border: "1px solid #e2e8f0",
      fontSize: "16px",
      backgroundColor: "#f8fafc",
      cursor: "pointer",
      appearance: "none",
      backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right 12px center",
      backgroundSize: "16px",
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
      transition: "background-color 0.2s ease",
      marginTop: "24px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    errorText: {
      color: "#e53e3e",
      fontSize: "14px",
      marginTop: "4px",
    },
    asterisk: {
      color: "#e53e3e",
      marginLeft: "4px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Add New Asset</h2>
      </div>
      <form onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Asset Name
            <span style={styles.asterisk}>*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            Description:
            <span style={styles.asterisk}>*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            style={styles.textarea}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            Department
            <span style={styles.asterisk}>*</span>
          </label>
          <input
            type="number"
            name="department_id"
            value={formData.department_id}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            Status
            <span style={styles.asterisk}>*</span>
          </label>
          <input
            type="number"
            name="status_id"
            value={formData.status_id}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            Assigned Date:
            <span style={styles.asterisk}>*</span>
          </label>
          <input
            type="date"
            name="assigned_date"
            value={formData.assigned_date}
            onChange={handleChange}
            required
            style={styles.dateInput}
          />
        </div>

        <button type="submit" style={styles.button}>
          ➕ Add Asset
        </button>
      </form>
    </div>
  );
};

export default AddAsset;
