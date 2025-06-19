import React, { useEffect, useState } from "react";

const Home = () => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const styles = {
    page: {
      minHeight: "100vh",
      width: "100%",
      backgroundImage: "url('/background.png')",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "40px 20px",
    },
    container: {
      maxWidth: "800px",
      width: "100%",
      backgroundColor: "rgba(255, 255, 255, 0.85)", // 🔍 Slight transparency
      borderRadius: "16px",
      padding: "48px 32px",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)",
      textAlign: "center",
      backdropFilter: "blur(4px)", // Optional: adds a frosted glass effect
      opacity: fadeIn ? 1 : 0,
      transform: fadeIn ? "translateY(0)" : "translateY(20px)",
      transition: "all 0.6s ease-in-out",
    },
    iconWrapper: {
      backgroundColor: "#ebf8ff",
      width: "72px",
      height: "72px",
      borderRadius: "50%",
      margin: "0 auto 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "32px",
      color: "#3182ce",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    },
    title: {
      fontSize: "28px",
      fontWeight: "600",
      color: "#2d3748",
      marginBottom: "12px",
    },
    subtitle: {
      fontSize: "17px",
      color: "#4a5568",
      maxWidth: "600px",
      margin: "0 auto",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.iconWrapper}>🏠</div>
        <h2 style={styles.title}>Your centralized platform for asset tracking</h2>
        <p style={styles.subtitle}>
          Seamlessly manage equipment, assignments, departments, and statuses —
          all from one intuitive interface.
        </p>
      </div>
    </div>
  );
};

export default Home;
