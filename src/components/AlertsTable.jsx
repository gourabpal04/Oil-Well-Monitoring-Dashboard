import React from 'react';
import alerts from '../data/alerts.json';

const AlertsTable = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Alerts</h2>
      <table className="w-full text-sm text-left">
        <thead className="text-gray-600 border-b">
          <tr>
            <th className="py-2">Well</th>
            <th className="py-2">Date</th>
            <th className="py-2">Alert</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((alert, index) => (
            <tr key={index} className="border-b last:border-0">
              <td className="py-2">{alert.well}</td>
              <td className="py-2">{alert.date}</td>
              <td className="py-2 text-red-600 font-medium">{alert.alert}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlertsTable;
