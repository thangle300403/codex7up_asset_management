import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddAssignment = () => {
  const [assets, setAssets] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    asset_id: "",
    department_id: "",
    assigned_date: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/assets")
      .then((res) => setAssets(res.data.items || [])) // ✅ Handle paginated response
      .catch((err) => {
        console.error("Failed to load assets:", err);
        setAssets([]);
      });

    axios
      .get("http://localhost:3000/api/departments/all")
      .then((res) => setDepartments(res.data))
      .catch((err) => {
        console.error("Failed to load departments:", err);
        setDepartments([]);
      });
  }, []);

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
        "http://localhost:3000/api/assignments/create",
        formData
      );
      alert("✅ Assignment created successfully!");
      navigate("/assignments");
    } catch (err) {
      console.error("❌ Error creating assignment:", err);
      alert("Failed to create assignment.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Assign Asset to Department</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>
        <div>
          <label>Asset:</label>
          <br />
          <select
            name="asset_id"
            value={formData.asset_id}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Asset --</option>
            {assets.map((asset) => (
              <option key={asset.id} value={asset.id}>
                {asset.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginTop: "12px" }}>
          <label>Department:</label>
          <br />
          <select
            name="department_id"
            value={formData.department_id}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Department --</option>
            {departments.map((dep) => (
              <option key={dep.id} value={dep.id}>
                {dep.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginTop: "12px" }}>
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

        <button type="submit" style={{ marginTop: "20px" }}>
          ➕ Assign
        </button>
      </form>
    </div>
  );
};

export default AddAssignment;
