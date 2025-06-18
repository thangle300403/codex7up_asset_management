import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddAssignment = () => {
  const [form, setForm] = useState({
    asset_id: "",
    department_id: "",
    assigned_date: "",
  });

  const [assets, setAssets] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch assets
    axios.get("http://localhost:3000/api/assets")
      .then((res) => setAssets(res.data))
      .catch((err) => console.error("Error fetching assets:", err));

    // Fetch departments
    axios.get("http://localhost:3000/api/departments")
      .then((res) => setDepartments(res.data))
      .catch((err) => console.error("Error fetching departments:", err));
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3000/api/assignments/create",
        form
      );
      alert("✅ Assignment created successfully!");
      navigate("/assignments");
    } catch (err) {
      console.error("❌ Error creating assignment:", err);
      alert("Failed to create assignment.");
    }
  };


  return (
    <div style={{ padding: "24px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Add New Assignment</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          marginTop: "16px",
          padding: "24px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          backgroundColor: "#fff",
        }}
      >
        <div>
          <label htmlFor="asset_id" style={{ display: "block", fontWeight: "bold", marginBottom: "4px" }}>
            Asset
          </label>
          <select
            name="asset_id"
            value={form.asset_id}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">-- Select Asset --</option>
            {assets.map((asset) => (
              <option key={asset.id} value={asset.id}>
                {asset.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="department_id" style={{ display: "block", fontWeight: "bold", marginBottom: "4px" }}>
            Department
          </label>
          <select
            name="department_id"
            value={form.department_id}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">-- Select Department --</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="assigned_date" style={{ display: "block", fontWeight: "bold", marginBottom: "4px" }}>
            Assigned Date
          </label>
          <input
            type="date"
            id="assigned_date"
            name="assigned_date"
            value={form.assigned_date}
            onChange={handleChange}
            required
            style={{
              width: "96%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "12px",
            backgroundColor: "#4CAF50",
            color: "white",
            fontWeight: "bold",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {loading ? "Submitting..." : "Add Assignment"}
        </button>
      </form>
    </div>
  );
};

export default AddAssignment;
