import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const FillReport = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const deptIdFromUrl = params.get("deptId");

  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState(deptIdFromUrl || "");
  const [assets, setAssets] = useState([]);
  const [note, setNote] = useState("");
  const [total, setTotal] = useState(0);
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const deptRes = await axios.get(
          "http://localhost:3000/api/departments/all"
        );
        setDepartments(deptRes.data);

        const statusRes = await axios.get("http://localhost:3000/api/statuses");
        setStatuses(statusRes.data);

        console.log("statuses:", statusRes.data); // ✅ This will log properly
      } catch (err) {
        console.error("❌ Error loading departments or statuses:", err);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    if (deptIdFromUrl) {
      setSelectedDept(deptIdFromUrl);
      loadAssets(deptIdFromUrl);
    }
  }, [deptIdFromUrl]);

  const loadAssets = async (deptId) => {
    const res = await axios.get(
      `http://localhost:3000/api/assets/by-department/${deptId}`
    );
    setAssets(res.data);
    console.log(res.data);
    setTotal(res.data.length);
  };

  const handleStatusChange = async (assetId, newStatusId) => {
    try {
      await axios.put(`http://localhost:3000/api/assets/${assetId}/status`, {
        status_id: newStatusId,
      });

      setAssets((prev) =>
        prev.map((a) =>
          a.id === assetId
            ? {
                ...a,
                status_id: newStatusId,
                status:
                  statuses.find((s) => s.id == newStatusId)?.status_name || "",
              }
            : a
        )
      );
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update asset status");
    }
  };

  const handleSubmitReport = async () => {
    const year = new Date().getFullYear();
    await axios.post("http://localhost:3000/api/reports", {
      year,
      department_id: selectedDept,
      created_by: user.id,
      total_assets: total,
      notes: note,
    });
    alert("✅ Report saved!");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>📋 Create Report</h2>

      <label>Select Department:</label>
      <select
        value={selectedDept}
        onChange={(e) => {
          setSelectedDept(e.target.value);
          loadAssets(e.target.value);
        }}
        style={{ padding: "8px", margin: "10px 0" }}
      >
        <option value="">-- Choose --</option>
        {departments.map((d) => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </select>

      {assets.length > 0 && (
        <>
          <h3>Total Assets: {total}</h3>

          <table border="1" cellPadding="10" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Status</th>
                <th>Update Status</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((a) => (
                <tr key={a.id}>
                  <td>{a.id}</td>
                  <td>{a.name}</td>
                  <td>{a.status}</td>
                  <td>
                    <select
                      value={a.status_id}
                      onChange={(e) => handleStatusChange(a.id, e.target.value)}
                    >
                      {statuses.map((status) => (
                        <option key={status.id} value={status.id}>
                          {status.status_name}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: "20px" }}>
            <label>📝 Notes:</label>
            <textarea
              rows="4"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              style={{ width: "100%", marginTop: "6px" }}
            />
          </div>

          <button
            onClick={handleSubmitReport}
            style={{ marginTop: "20px", padding: "10px 20px" }}
          >
            ✅ Submit Report
          </button>
        </>
      )}
    </div>
  );
};

export default FillReport;
