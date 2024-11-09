import React from 'react';
import { Link } from 'react-router-dom';
import './layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <header className="layout-header">
        <div className="header-content">
          <h1 className="site-title">
            <Link to="/" className="header-link flex">
              eScanify
            </Link>
          </h1>
          <nav>
            <ul className="nav-links">
              <li>
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/certificate-details" className="nav-link">
                  Certificate Details
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="layout-main">
        {children}
      </main>

      <footer className="layout-footer">
        <p className="footer-text">&copy; 2024 eScanify. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
