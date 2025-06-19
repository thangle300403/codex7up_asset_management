// src/App.jsx
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/Router";
import Header from "./component/Header"; 
import Footer from "./component/Footer"; 
import "@fortawesome/fontawesome-free/css/all.min.css";

import { SearchProvider } from "./context/SearchContext"; 

function App() {
  return (
      <SearchProvider> {}
        <Header />
        <main style={{ minHeight: "80vh" }}>
          <AppRoutes />
        </main>
        <Footer />
      </SearchProvider>
  );
}

export default App;
