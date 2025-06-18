import React from "react";

export const Box = ({ children }) => {
  return (
    <div
      style={{
        border: "2px solid #ccc",
        paddingLeft: "16px",
        paddingRight: "16px",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        display: "flex",
        flexDirection: "row",
        gap: "8px",
        marginBottom: "16px",
        maxHeight: "200px",
      }}
    >
      {children}
    </div>
  );
};
