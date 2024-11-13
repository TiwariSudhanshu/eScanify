import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Certificate from "./certificate";
import Layout from "./Layout";
import CertificateDetails from "./CertificateDetails";
import Form from './Form'; 
import WebCert from './WebCert';

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Layout>
        <Routes >
        <Route path="/certificate" element={<WebCert />} />
          {/* <Route path="/" element={<Certificate />} /> */}
          <Route path="/profile/:id" element={<CertificateDetails />} />
          <Route path="/" element={<Form />} />  {/* Added route for Form */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
