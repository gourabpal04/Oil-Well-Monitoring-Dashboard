import React, { useState } from 'react';
import wells from '../data/wells.json';
import WellCategoryView from '../components/WellCategoryView';
import ProductionChart from '../components/ProductionChart';
import MaintenanceLogs from '../components/MaintenanceLogs';
import AlertsTable from '../components/AlertsTable';
import Header from '../components/Header';

const Dashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  console.log('Dashboard rendered with selectedCategory:', selectedCategory);

  // Calculate statistics
  const totalWells = wells.length;
  const flowingWells = wells.filter(well => well.status === 'Flowing').length;
  const sickWells = wells.filter(well => well.status === 'Sick').length;
  const abandonedWells = wells.filter(well => well.status === 'Dry/Abandoned').length;

  // Calculate total production
  const totalGasProduction = wells.reduce((sum, well) => sum + (well.qg || 0), 0);
  const totalWaterProduction = wells.reduce((sum, well) => sum + (well.qw || 0), 0);
  const totalCondensateProduction = wells.reduce((sum, well) => sum + (well.qc || 0), 0);

  const handleCategoryClick = (category) => {
    console.log('Category clicked:', category);
    setSelectedCategory(category);
  };

  const handleBackClick = () => {
    console.log('Back button clicked');
    setSelectedCategory(null);
  };

  if (selectedCategory) {
    return (
      <>
        <Header />
        <div className="p-6 bg-gray-50 min-h-screen">
          <button
            onClick={handleBackClick}
            className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </button>
          <WellCategoryView category={selectedCategory} />
        </div>
      </>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div 
                onClick={() => handleCategoryClick('total')}
                className="bg-sky-100 p-6 rounded-xl shadow-md transform transition-all duration-300 hover:scale-105 cursor-pointer hover:bg-sky-200"
              >
                <h3 className="text-gray-700 text-sm mb-2">Total Wells</h3>
                <p className="text-2xl font-bold text-sky-800">{totalWells}</p>
              </div>
              <div 
                onClick={() => handleCategoryClick('flowing')}
                className="bg-green-100 p-6 rounded-xl shadow-md transform transition-all duration-300 hover:scale-105 cursor-pointer hover:bg-green-200"
              >
                <h3 className="text-gray-700 text-sm mb-2">Flowing Wells</h3>
                <p className="text-2xl font-bold text-green-800">{flowingWells}</p>
              </div>
              <div 
                onClick={() => handleCategoryClick('sick')}
                className="bg-yellow-100 p-6 rounded-xl shadow-md transform transition-all duration-300 hover:scale-105 cursor-pointer hover:bg-yellow-200"
              >
                <h3 className="text-gray-700 text-sm mb-2">Sick Wells</h3>
                <p className="text-2xl font-bold text-yellow-800">{sickWells}</p>
              </div>
              <div 
                onClick={() => handleCategoryClick('abandoned')}
                className="bg-red-100 p-6 rounded-xl shadow-md transform transition-all duration-300 hover:scale-105 cursor-pointer hover:bg-red-200"
              >
                <h3 className="text-gray-700 text-sm mb-2">Abandoned Wells</h3>
                <p className="text-2xl font-bold text-red-800">{abandonedWells}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-sky-50 p-6 rounded-xl shadow-md">
                <h3 className="text-gray-700 text-sm mb-2">Gas Production</h3>
                <p className="text-xl font-bold text-sky-800">
                  {(totalGasProduction / 1000000).toFixed(2)} MMSCMD
                </p>
              </div>
              <div className="bg-sky-50 p-6 rounded-xl shadow-md">
                <h3 className="text-gray-700 text-sm mb-2">Water Production</h3>
                <p className="text-xl font-bold text-sky-800">
                  {totalWaterProduction.toFixed(2)} m³/d
                </p>
              </div>
              <div className="bg-sky-50 p-6 rounded-xl shadow-md">
                <h3 className="text-gray-700 text-sm mb-2">Condensate Production</h3>
                <p className="text-xl font-bold text-sky-800">
                  {totalCondensateProduction.toFixed(2)} m³/d
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md mb-6">
              <div className="w-full" style={{ minHeight: '400px', height: '60vh' }}>
                <ProductionChart />
              </div>
            </div>
          </>
        );
      case 'maintenance':
        return (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-6">Maintenance Logs</h2>
            <MaintenanceLogs />
          </div>
        );
      case 'alerts':
        return (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-6">Alerts</h2>
            <AlertsTable />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 flex space-x-4 bg-gray-100 rounded-lg p-3">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-8 py-4 font-medium text-sm rounded-lg transition-all duration-200 border-2 shadow-sm ${
                activeTab === 'overview'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-400 hover:border-blue-400'
              }`}
            >
              <span className="text-base">Overview</span>
            </button>
            <button
              onClick={() => setActiveTab('maintenance')}
              className={`px-8 py-4 font-medium text-sm rounded-lg transition-all duration-200 border-2 shadow-sm ${
                activeTab === 'maintenance'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-400 hover:border-blue-400'
              }`}
            >
              <span className="text-base">Maintenance Logs</span>
            </button>
            <button
              onClick={() => setActiveTab('alerts')}
              className={`px-8 py-4 font-medium text-sm rounded-lg transition-all duration-200 border-2 shadow-sm ${
                activeTab === 'alerts'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-400 hover:border-blue-400'
              }`}
            >
              <span className="text-base">Alerts</span>
            </button>
          </div>

          {renderTabContent()}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
