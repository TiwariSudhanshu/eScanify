import React from 'react';
import { Link } from 'react-router-dom';
import './layout.css';
import Button from '@mui/material/Button';
import { colors } from '@mui/material';

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <header className="layout-header">
        <div className="header-content">
          <h1 className="site-title">
            <Link to="/" className="header-link flex ">
              eScanify
            </Link>
          </h1>
          <nav>
            <ul className="nav-links flex gap-4">
              <li>
                {/* <Link to="/" className="nav-link text-lg">
                  Home
                </Link> */}
                <Button variant="outlined"><Link to="/" className="nav-link text-lg">
                  Home
                </Link></Button>
              </li>
              <li>
                
                <Button variant="outlined"><Link to="/certificate-details" className="nav-link text-lg">
                  Certificate Details
                </Link></Button>
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
