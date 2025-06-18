import React from "react";
import AppRoutes from "./routes/Router";
import Header from "./component/Header";
import Footer from "./component/Footer";

function App() {
  return (
    <>
      <body>
        <div style={{ minHeight: "62vh" }}>
          <Header />
          <AppRoutes />
        </div>
        <Footer />
      </body>
    </>
  );
}

export default App;
