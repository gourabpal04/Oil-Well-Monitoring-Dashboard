import React from 'react';
import maintenance from '../data/maintenance.json';

const MaintenanceLogs = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Maintenance Logs</h2>
      <table className="w-full text-sm text-left">
        <thead className="text-gray-600 border-b">
          <tr>
            <th className="py-2">Well</th>
            <th className="py-2">Date</th>
            <th className="py-2">Activity</th>
          </tr>
        </thead>
        <tbody>
          {maintenance.map((log, index) => (
            <tr key={index} className="border-b last:border-0">
              <td className="py-2">{log.well}</td>
              <td className="py-2">{log.date}</td>
              <td className="py-2">{log.activity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MaintenanceLogs;
