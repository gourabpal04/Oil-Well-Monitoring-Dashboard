import React from 'react';

const SummaryCards = ({ activeWells, dailyProduction, openMaintenance, alertsCount }) => {
  const summaryData = [
    { label: 'Active Wells', value: activeWells, color: 'text-green-600' },
    { label: 'Daily Production', value: `${dailyProduction.toLocaleString()} bbl`, color: 'text-blue-600' },
    { label: 'Open Maintenance', value: openMaintenance, color: 'text-yellow-600' },
    { label: 'Alerts', value: alertsCount, color: 'text-red-600' }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {summaryData.map((item, index) => (
        <div 
          key={index} 
          className="bg-white rounded-xl shadow p-6 text-center transform hover:scale-105 transition-transform duration-300"
        >
          <h2 className={`text-3xl font-bold ${item.color}`}>
            {item.value}
          </h2>
          <p className="text-gray-600 mt-2 font-medium">{item.label}</p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
