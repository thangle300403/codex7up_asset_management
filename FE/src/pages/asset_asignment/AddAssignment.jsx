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
      .then((res) => setAssets(res.data))
      .catch((err) => console.error("Failed to load assets:", err));

    axios
      .get("http://localhost:3000/api/departments")
      .then((res) => setDepartments(res.data))
      .catch((err) => console.error("Failed to load departments:", err));
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
      alert(err.response?.data?.message || "Failed to create assignment.");
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#f9f9f9",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "white",
            padding: "40px",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            width: "100%",
            maxWidth: "500px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <h2 style={{ textAlign: "center" }}>Assign Asset to Department</h2>

          <div
            className="form-group"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              fontWeight: "bold",
            }}
          >
            <div>
              <label>Asset:</label>
              <br />
              <select
                name="asset_id"
                value={formData.asset_id}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "8px" }}
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
              <label>Department:</label>
              <br />
              <select
                name="department_id"
                value={formData.department_id}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "8px" }}
              >
                <option value="">-- Select Department --</option>
                {departments.map((dep) => (
                  <option key={dep.id} value={dep.id}>
                    {dep.name}
                  </option>
                ))}
              </select>
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
                style={{ width: "96%", padding: "8px" }}
              />
            </div>

            <button
              type="submit"
              disabled={
                !formData.asset_id ||
                !formData.department_id ||
                !formData.assigned_date
              }
              style={{
                padding: "10px",
                fontWeight: "bold",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              ➕ Assign
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddAssignment;
