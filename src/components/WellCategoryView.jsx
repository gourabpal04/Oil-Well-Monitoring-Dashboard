import React from 'react';
import wells from '../data/wells.json';

const WellCategoryView = ({ category }) => {
  console.log('WellCategoryView rendered with category:', category);
  console.log('Available wells:', wells);

  // Filter wells based on category
  const filteredWells = wells.filter(well => {
    switch (category) {
      case 'total':
        return true;
      case 'flowing':
        return well.status === 'Flowing';
      case 'sick':
        return well.status === 'Sick';
      case 'abandoned':
        return well.status === 'Dry/Abandoned';
      default:
        return false;
    }
  });

  console.log('Filtered wells:', filteredWells);

  const statusStyles = {
    'Flowing': 'bg-green-100 text-green-800',
    'Sick': 'bg-yellow-100 text-yellow-800',
    'Dry/Abandoned': 'bg-red-100 text-red-800'
  };

  const getCategoryTitle = () => {
    switch (category) {
      case 'total':
        return 'All Wells';
      case 'flowing':
        return 'Flowing Wells';
      case 'sick':
        return 'Sick Wells';
      case 'abandoned':
        return 'Abandoned Wells';
      default:
        return 'Wells';
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">{getCategoryTitle()} ({filteredWells.length})</h2>
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-gray-600 bg-gray-50">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Location</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">FTHP (psi)</th>
                <th className="px-6 py-3">Gas Rate (MMSCMD)</th>
                <th className="px-6 py-3">Water Rate (m³/d)</th>
                <th className="px-6 py-3">Condensate (m³/d)</th>
                <th className="px-6 py-3">Reason</th>
                <th className="px-6 py-3">Plan</th>
              </tr>
            </thead>
            <tbody>
              {filteredWells.map((well, index) => (
                <tr 
                  key={index}
                  className="border-b hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 font-medium">{well.name}</td>
                  <td className="px-6 py-4">{well.location}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[well.status]}`}>
                      {well.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{well.fthp || '-'}</td>
                  <td className="px-6 py-4">{well.qg ? (well.qg / 1000000).toFixed(2) : '-'}</td>
                  <td className="px-6 py-4">{well.qw || '-'}</td>
                  <td className="px-6 py-4">{well.qc || '-'}</td>
                  <td className="px-6 py-4">{well.reason || '-'}</td>
                  <td className="px-6 py-4">{well.plan || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WellCategoryView; 