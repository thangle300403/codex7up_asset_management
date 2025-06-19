// src/App.jsx
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/Router"; // ✅ your routing config
import Header from "./components/Header"; // ✅ your header
import Footer from "./components/Footer"; // ✅ your footer
import "@fortawesome/fontawesome-free/css/all.min.css";

// ✅ OPTIONAL: if you're using SearchContext or any other context, import it
import { SearchProvider } from "./context/SearchContext"; // adjust path if needed

function App() {
  return (
      <SearchProvider> {/* ✅ wrap in context if needed */}
        <Header />
        <main style={{ minHeight: "80vh" }}>
          <AppRoutes />
        </main>
        <Footer />
      </SearchProvider>
  );
}

export default App;
