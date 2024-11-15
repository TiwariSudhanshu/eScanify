import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-indigo-100 via-blue-100 to-sky-50">
      {/* Header */}
      <header className="bg-shubhu z-20  text-white fixed top-0 w-full h-10 flex items-center">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">
            <Link to="/" className="border-white  text-white hover:text-blue-200">
              eScanify
            </Link>
          </h1>
          <nav>
            
          </nav>
        </div>
      </header>

      {/* Main content area with flex-grow to push footer to the bottom */}
      <main className="flex-grow container mx-auto px-4 py-8 mt-44 border-gray-600 rounded-xl">
        {children}
      </main>

      {/* Footer fixed at the bottom */}
      <footer className="bg-shubhu z-20 text-white text-center h-8 flex fixed bottom-0 w-full items-center justify-center">
        <p className="text-sm">&copy; 2024 eScanify. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
