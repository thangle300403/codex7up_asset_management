import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditDepartment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [departmentName, setDepartmentName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/departments/${id}`)
      .then((res) => {
        setDepartmentName(res.data.name || "");
        setLoading(false);
      })
      .catch((err) => {
        alert("❌ Failed to fetch department info");
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/api/departments/${id}`, {
        name: departmentName,
      })
      .then(() => {
        alert("✅ Department updated successfully");
        navigate("/departments");
      })
      .catch((err) => {
        alert("❌ Update failed");
      });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Department</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Department Name:</label>
          <br />
          <input
            type="text"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>
          ✅ Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditDepartment;
