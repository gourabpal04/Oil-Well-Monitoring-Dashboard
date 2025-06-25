import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import DataEntry from './pages/DataEntry';

const App = () => {
  return (
    <Router>
      {/* Top Navigation Bar */}
      <div className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">🛢 Oil Well Monitoring</h1>
        <nav className="space-x-4">
          <Link to="/" className="hover:underline">Dashboard</Link>
          <Link to="/data-entry" className="hover:underline">Data Entry</Link>
        </nav>
      </div>

      {/* Page Routing */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/data-entry" element={<DataEntry />} />
      </Routes>
    </Router>
  );
};

export default App;
