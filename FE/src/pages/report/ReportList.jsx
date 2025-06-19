import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ReportList = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/reports")
      .then((res) => {
        setReports(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching reports:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading reports...</p>;

  return (
    <div
      style={{
        backgroundColor: "#f4f4f4",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div style={tableStyles.container}>
        {/* Header */}
        <div style={tableStyles.header}>
          <h2 style={tableStyles.title}>📋 Report List</h2>
        </div>

        {/* Table */}
        <table style={tableStyles.table}>
          <thead>
            <tr>
              <th style={tableStyles.th}>ID</th>
              <th style={tableStyles.th}>Year</th>
              <th style={tableStyles.th}>Department ID</th>
              <th style={tableStyles.th}>Employee ID</th>
              <th style={tableStyles.th}>Total assets</th>
              <th style={tableStyles.th}>Note</th>
              <th style={tableStyles.th}>Created at</th>
              <th style={tableStyles.th}>Approved</th>
            </tr>
          </thead>
          <tbody>
            {reports.length === 0 ? (
              <tr>
                <td
                  colSpan="3"
                  style={{ padding: "16px", textAlign: "center" }}
                >
                  No reports found.
                </td>
              </tr>
            ) : (
              reports.map((a, index) => (
                <tr
                  key={a.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                  }}
                >
                  <td style={tableStyles.td}>{a.id}</td>
                  <td style={tableStyles.td}>{a.year}</td>
                  <td style={tableStyles.td}>{a.department_id}</td>
                  <td style={tableStyles.td}>{a.created_by}</td>
                  <td style={tableStyles.td}>{a.total_assets}</td>
                  <td style={tableStyles.td}>{a.notes}</td>
                  <td style={tableStyles.td}>{a.created_at}</td>
                  <td style={tableStyles.td}>{a.aproved}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const tableStyles = {
  container: {
    padding: "32px",
    maxWidth: "1200px",
    margin: "0 auto",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },
  title: {
    fontSize: "24px",
    color: "#2c3e50",
    margin: 0,
  },
  addButton: {
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    transition: "background-color 0.2s",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    overflow: "hidden",
  },
  th: {
    backgroundColor: "#f8f9fa",
    padding: "12px 16px",
    textAlign: "left",
    color: "#2c3e50",
    fontWeight: "600",
    borderBottom: "2px solid #e9ecef",
  },
  td: {
    padding: "12px 16px",
    borderBottom: "1px solid #e9ecef",
    color: "#2c3e50",
  },
  actionButton: {
    padding: "6px 12px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.2s",
  },
  editButton: {
    backgroundColor: "#2ecc71",
    color: "white",
    marginRight: "8px",
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    color: "white",
  },
};

export default ReportList;
