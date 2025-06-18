import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

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
    // Fetch asset data
    axios.get(`http://localhost:3000/api/assets/${id}`).then((res) => {
      const data = res.data;
      setAsset({
        name: data.name,
        description: data.description,
        department_id: data.department_id,
        status_id: data.status_id,
      });
    });

    // Fetch dropdowns
    axios.get("http://localhost:3000/api/departments").then((res) => {
      setDepartments(res.data);
    });

    axios.get("http://localhost:3000/api/statuses").then((res) => {
      setStatuses(res.data);
    });
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
    <div style={{ padding: "24px" }}>
      <h2>Edit Asset</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <br />
          <input
            type="text"
            name="name"
            value={asset.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <br />
          <textarea
            name="description"
            value={asset.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div>
          <label>Department:</label>
          <br />
          <select
            name="department_id"
            value={asset.department_id}
            onChange={handleChange}
            required
          >
            <option value="">--Select--</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Status:</label>
          <br />
          <select
            name="status_id"
            value={asset.status_id}
            onChange={handleChange}
            required
          >
            <option value="">--Select--</option>
            {statuses.map((s) => (
              <option key={s.id} value={s.id}>
                {s.status_name}
              </option>
            ))}
          </select>
        </div>

        <br />
        <button type="submit">Update Asset</button>
      </form>
    </div>
  );
};

export default EditAsset;
