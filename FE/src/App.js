import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import AppRoutes from "./routes/Router";
import Header from "./components/Header";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <AppRoutes />
      <Footer />
    </>
  );
}

export default App;
