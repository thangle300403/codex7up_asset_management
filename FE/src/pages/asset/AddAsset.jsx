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

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add New Asset</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>
        <div>
          <label>Name:</label>
          <br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <br />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Department ID:</label>
          <br />
          <input
            type="number"
            name="department_id"
            value={formData.department_id}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Status ID:</label>
          <br />
          <input
            type="number"
            name="status_id"
            value={formData.status_id}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Assigned Date:</label>
          <br />
          <input
            type="date"
            name="assigned_date"
            value={formData.assigned_date}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" style={{ marginTop: "10px" }}>
          ➕ Add Asset
        </button>
      </form>
    </div>
  );
};

export default AddAsset;
