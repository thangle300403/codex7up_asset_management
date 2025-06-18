import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddDepartment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
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
      await axios.post(
        "http://localhost:3000/api/departments/create",
        formData
      );
      alert("✅ Department added successfully!");
      navigate("/departments");
    } catch (err) {
      console.error("❌ Error adding department:", err);
      alert("Failed to add department.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add New Department</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>
        <div>
          <label>Department Name:</label>
          <br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>
          ➕ Add Department
        </button>
      </form>
    </div>
  );
};

export default AddDepartment;
