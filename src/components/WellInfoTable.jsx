import React from 'react';
import wells from '../data/wells.json';

const statusStyles = {
  Flowing: 'bg-green-100 text-green-800',
  Sick: 'bg-yellow-100 text-yellow-800',
  'Dry/Abandoned': 'bg-red-100 text-red-800',
  Unknown: 'bg-gray-100 text-gray-800'
};

const WellInfoTable = () => {
  // Sort wells by name
  const sortedWells = [...wells].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Well Information</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-gray-600 border-b">
            <tr>
              <th className="py-2">#</th>
              <th className="py-2">Name</th>
              <th className="py-2">Location</th>
              <th className="py-2">Status</th>
              <th className="py-2">FTHP (psi)</th>
              <th className="py-2">Gas Rate (MMSCMD)</th>
              <th className="py-2">Water Rate (m³/d)</th>
              <th className="py-2">Condensate (m³/d)</th>
            </tr>
          </thead>
          <tbody>
            {sortedWells.map((well, index) => (
              <tr 
                key={index} 
                className="border-b last:border-0 hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="py-2 font-medium">{index + 1}</td>
                <td className="py-2 font-medium">{well.name}</td>
                <td className="py-2">{well.location}</td>
                <td className="py-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[well.status] || 'bg-gray-200 text-gray-700'}`}>
                    {well.status}
                  </span>
                </td>
                <td className="py-2">{well.fthp || '-'}</td>
                <td className="py-2">{well.qg ? (well.qg / 1000000).toFixed(2) : '-'}</td>
                <td className="py-2">{well.qw || '-'}</td>
                <td className="py-2">{well.qc || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WellInfoTable;
