import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const formStyles = {
  container: {
    padding: "32px",
    maxWidth: "800px",
    margin: "0 auto",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: "24px",
    color: "#2c3e50",
    marginBottom: "24px",
  },
  formGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    color: "#2c3e50",
    fontWeight: "500",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #dcdfe6",
    fontSize: "14px",
    transition: "border-color 0.2s",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #dcdfe6",
    fontSize: "14px",
    minHeight: "100px",
    resize: "vertical",
  },
  select: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #dcdfe6",
    fontSize: "14px",
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    padding: "12px 24px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "500",
    transition: "background-color 0.2s",
  },
};

const EditAsset = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [asset, setAsset] = useState({
    name: "",
    description: "",
    department_id: "",
    status_id: "",
  });

  const [departments, setDepartments] = useState([]);
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    // Fetch asset data with error handling
    const fetchData = async () => {
      axios.get("http://localhost:3000/api/departments/all").then((res) => {
        setDepartments(res.data);
      });
      try {
        const [assetRes, deptRes, statusRes] = await Promise.all([
          axios.get(`http://localhost:3000/api/assets/${id}`),
          axios.get("http://localhost:3000/api/statuses"),
        ]);
        setAsset({
          name: assetRes.data.name,
          description: assetRes.data.description,
          department_id: assetRes.data.department_id,
          status_id: assetRes.data.status_id,
        });
        setStatuses(statusRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        alert("Failed to load asset data");
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAsset((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/api/assets/${id}`, asset)
      .then(() => {
        alert("Asset updated!");
        navigate("/assets");
      })
      .catch((err) => {
        console.error("Update failed", err);
        alert("Update failed");
      });
  };

  return (
    <div style={formStyles.container}>
      <h2 style={formStyles.title}>Edit Asset</h2>
      <form onSubmit={handleSubmit}>
        <div style={formStyles.formGroup}>
          <label style={formStyles.label}>Name</label>
          <input
            style={formStyles.input}
            type="text"
            name="name"
            value={asset.name}
            onChange={handleChange}
            required
            placeholder="Enter asset name"
          />
        </div>

        <div style={formStyles.formGroup}>
          <label style={formStyles.label}>Description</label>
          <textarea
            style={formStyles.textarea}
            name="description"
            value={asset.description}
            onChange={handleChange}
            placeholder="Enter asset description"
          ></textarea>
        </div>

        <div style={formStyles.formGroup}>
          <label style={formStyles.label}>Department</label>
          <select
            style={formStyles.select}
            name="department_id"
            value={asset.department_id}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <div style={formStyles.formGroup}>
          <label style={formStyles.label}>Status</label>
          <select
            style={formStyles.select}
            name="status_id"
            value={asset.status_id}
            onChange={handleChange}
            required
          >
            <option value="">Select Status</option>
            {statuses.map((s) => (
              <option key={s.id} value={s.id}>
                {s.status_name}
              </option>
            ))}
          </select>
        </div>

        <button style={formStyles.button} type="submit">
          Update Asset
        </button>
      </form>
    </div>
  );
};

export default EditAsset;
