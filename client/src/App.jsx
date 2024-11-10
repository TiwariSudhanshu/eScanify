import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Certificate from "./certificate";
import Layout from "./Layout";
import CertificateDetails from "./CertificateDetails";
import Form from './Form'; 

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Layout>
        <Routes >
          <Route path="/" element={<Certificate />} />
          <Route path="/certificate-details" element={<CertificateDetails />} />
          <Route path="/form" element={<Form />} />  {/* Added route for Form */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
