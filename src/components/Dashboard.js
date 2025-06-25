import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import wellsData from '../data/wells.json';
import WellStatsTable from './WellStatsTable';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [chartHeight, setChartHeight] = useState(400);

  // Update chart height based on window size
  useEffect(() => {
    const updateChartHeight = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setChartHeight(300);
      } else if (width < 1024) {
        setChartHeight(400);
      } else {
        setChartHeight(500);
      }
    };

    updateChartHeight();
    window.addEventListener('resize', updateChartHeight);
    return () => window.removeEventListener('resize', updateChartHeight);
  }, []);

  // Calculate statistics
  const totalWells = wellsData.length;
  const flowingWells = wellsData.filter(well => well.status === 'Flowing').length;
  const sickWells = wellsData.filter(well => well.status === 'Sick').length;
  const abandonedWells = wellsData.filter(well => well.status === 'Dry/Abandoned').length;

  // Calculate total production
  const totalGasProduction = wellsData.reduce((sum, well) => sum + (well.qg || 0), 0);
  const totalWaterProduction = wellsData.reduce((sum, well) => sum + (well.qw || 0), 0);
  const totalCondensateProduction = wellsData.reduce((sum, well) => sum + (well.qc || 0), 0);

  // Prepare chart data
  const chartData = {
    labels: ['2020', '2021', '2022', '2023', '2024', '2025 (YTD)'],
    datasets: [
      {
        label: 'Gas Production (MMSCM)',
        data: [490, 470, 500, 520, 510, 180],
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
        borderWidth: 2
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart'
    },
    interaction: {
      mode: 'index',
      intersect: false
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            weight: 'bold'
          },
          padding: 20
        }
      },
      title: {
        display: true,
        text: 'Yearly Gas Production',
        color: '#333',
        font: {
          size: 18,
          weight: 'bold'
        },
        padding: {
          top: 10,
          bottom: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#333',
        bodyColor: '#666',
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y} MMSCM`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false
        },
        ticks: {
          font: {
            size: 12
          },
          padding: 10
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 12
          },
          padding: 10
        }
      }
    }
  };

  // Sample maintenance and alert logs
  const maintenanceLogs = [
    { id: 1, well: 'A#1', type: 'Routine', date: '2024-03-15', status: 'Completed', description: 'Regular valve maintenance' },
    { id: 2, well: 'KO#2', type: 'Emergency', date: '2024-03-14', status: 'In Progress', description: 'Pressure gauge replacement' },
    { id: 3, well: 'M#1', type: 'Scheduled', date: '2024-03-13', status: 'Scheduled', description: 'Annual equipment inspection' }
  ];

  const alertLogs = [
    { id: 1, well: 'A#3', severity: 'High', date: '2024-03-15', message: 'Pressure drop detected' },
    { id: 2, well: 'G#2', severity: 'Medium', date: '2024-03-14', message: 'Water rate fluctuation' },
    { id: 3, well: 'KB#1', severity: 'Low', date: '2024-03-13', message: 'Minor temperature variation' }
  ];

  return (
    <div className="dashboard p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="dashboard-header bg-white p-6 rounded-xl shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Oil Well Monitoring Dashboard</h1>
          <div className="dashboard-tabs flex space-x-4">
            <button 
              className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                activeTab === 'overview' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                activeTab === 'maintenance' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('maintenance')}
            >
              Maintenance
            </button>
            <button 
              className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                activeTab === 'alerts' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('alerts')}
            >
              Alerts
            </button>
          </div>
        </div>

        {activeTab === 'overview' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-xl shadow-md transform transition-all duration-300 hover:scale-105">
                <h3 className="text-gray-500 text-sm mb-2">Total Wells</h3>
                <p className="text-2xl font-bold text-gray-800">{totalWells}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md transform transition-all duration-300 hover:scale-105">
                <h3 className="text-gray-500 text-sm mb-2">Flowing Wells</h3>
                <p className="text-2xl font-bold text-green-600">{flowingWells}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md transform transition-all duration-300 hover:scale-105">
                <h3 className="text-gray-500 text-sm mb-2">Sick Wells</h3>
                <p className="text-2xl font-bold text-yellow-600">{sickWells}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md transform transition-all duration-300 hover:scale-105">
                <h3 className="text-gray-500 text-sm mb-2">Abandoned Wells</h3>
                <p className="text-2xl font-bold text-red-600">{abandonedWells}</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Production Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-gray-50 rounded-lg transform transition-all duration-300 hover:scale-105">
                  <h3 className="text-gray-500 text-sm mb-2">Gas Production</h3>
                  <p className="text-xl font-bold text-gray-800">{(totalGasProduction / 1000000).toFixed(2)} MMSCMD</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg transform transition-all duration-300 hover:scale-105">
                  <h3 className="text-gray-500 text-sm mb-2">Water Production</h3>
                  <p className="text-xl font-bold text-gray-800">{totalWaterProduction.toFixed(2)} m³/d</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg transform transition-all duration-300 hover:scale-105">
                  <h3 className="text-gray-500 text-sm mb-2">Condensate Production</h3>
                  <p className="text-xl font-bold text-gray-800">{totalCondensateProduction.toFixed(2)} m³/d</p>
                </div>
              </div>
              <div style={{ height: `${chartHeight}px` }} className="transition-all duration-500">
                <Line data={chartData} options={chartOptions} />
              </div>
            </div>

            <WellStatsTable />
          </>
        )}

        {activeTab === 'maintenance' && (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Maintenance Logs</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {maintenanceLogs.map(log => (
                <div key={log.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-800">{log.well}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      log.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      log.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {log.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{log.type}</p>
                  <p className="text-sm text-gray-500 mb-2">{log.date}</p>
                  <p className="text-sm text-gray-700">{log.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Alert Logs</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {alertLogs.map(log => (
                <div key={log.id} className={`p-4 rounded-lg ${
                  log.severity === 'High' ? 'bg-red-50' :
                  log.severity === 'Medium' ? 'bg-yellow-50' :
                  'bg-blue-50'
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-800">{log.well}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      log.severity === 'High' ? 'bg-red-100 text-red-800' :
                      log.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {log.severity}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{log.date}</p>
                  <p className="text-sm text-gray-700">{log.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 