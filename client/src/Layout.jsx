import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white fixed top-0 w-full h-16 flex items-center">
        <div className="container  mx-auto px-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">
            <Link to="/" className="border-white text-white hover:text-blue-200">
              eScanify
            </Link>
          </h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Button variant="outlined" className="border-white text-white hover:border-gray-300">
                  <Link to="/" className="text-lg hover:text-blue-200">
                    {/* Home */}
                  </Link>
                </Button>
              </li>
              <li>
                <Button variant="outlined" className="border-white text-white hover:border-gray-300">
                  <Link to="/certificate-details" className="text-lg hover:text-blue-200">
                    {/* Certificate Details */}
                  </Link>
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main content area with flex-grow to push footer to the bottom */}
      <main className="flex-grow container mx-auto px-4 py-8 mt-4">
        {children}
      </main>

      {/* Footer fixed at the bottom */}
      <footer className="bg-blue-600 text-white text-center h-16 flex fixed bottom-0 w-full items-center justify-center">
        <p className="text-sm">&copy; 2024 eScanify. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
