import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddStatus = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    status_name: "",
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
      await axios.post("http://localhost:3000/api/statuses/create", formData);
      alert("✅ Status added successfully!");
      navigate("/statuses");
    } catch (err) {
      console.error("❌ Error adding status:", err);
      alert("Failed to add status.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add New Status</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>
        <div>
          <label>Status Name:</label>
          <br />
          <input
            type="text"
            name="status_name"
            value={formData.status_name}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>
          ➕ Add Status
        </button>
      </form>
    </div>
  );
};

export default AddStatus;
