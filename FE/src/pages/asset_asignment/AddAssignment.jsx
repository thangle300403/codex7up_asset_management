import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddAssignment = () => {
  const [form, setForm] = useState({
    asset: "",
    department: "",
    assigned_date: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:3000/api/assignments", form);
      alert("Assignment added successfully!");
      navigate("/assignments");
    } catch (err) {
      console.error("Failed to add assignment:", err);
      alert(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
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
          <label htmlFor="asset" style={{ display: "block", fontWeight: "bold", marginBottom: "4px" }}>
            Asset
          </label>
          <input
            type="text"
            id="asset"
            name="asset"
            value={form.asset}
            onChange={handleChange}
            required
            placeholder="Enter asset name"
            style={{
              width: "96%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div>
          <label htmlFor="department" style={{ display: "block", fontWeight: "bold", marginBottom: "4px" }}>
            Department
          </label>
          <input
            type="text"
            id="department"
            name="department"
            value={form.department}
            onChange={handleChange}
            required
            placeholder="Enter department"
            style={{
              width: "96%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
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
              width: "98%",
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
