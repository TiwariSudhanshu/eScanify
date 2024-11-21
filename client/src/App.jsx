import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import CertificateDetails from "./pages/Details/CertificateDetails";
import WebCert from "./pages//Certificates/WebCert";
import CertificatePreview from "./pages/Preview/CertificatePreview";
import Home from "./pages/Home/home";

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <>
        <Routes >
        <Route path="/certificate" element={<WebCert />} />
        <Route path="/certificates" element={<CertificatePreview />} />
          <Route path="/profile/:id" element={<CertificateDetails />} />
          <Route path="/" element={<Home/>}/>
        </Routes>
      </>
    </Router>
  );
}

export default App;
