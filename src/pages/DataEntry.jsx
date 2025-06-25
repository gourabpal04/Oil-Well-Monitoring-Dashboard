import React, { useState } from 'react';
import DataEntryForm from '../components/DataEntryForm';
import Header from '../components/Header';

const DataEntry = () => {
  const [entries, setEntries] = useState([]);

  const handleFormSubmit = (formData) => {
    console.log("New entry submitted:", formData);
    setEntries(prev => [...prev, formData]);
  };

  return (
    <>
      <Header />
      <div className="p-6 bg-gray-50 min-h-screen">
        <DataEntryForm onSubmit={handleFormSubmit} />

        {entries.length > 0 && (
          <div className="mt-10 max-w-xl mx-auto bg-white p-4 rounded shadow-md">
            <h3 className="text-xl font-bold mb-4">Submitted Entries</h3>
            <ul className="space-y-2">
              {entries.map((entry, index) => (
                <li key={index} className="border p-3 rounded">
                  <p><strong>Place:</strong> {entry.place}</p>
                  <p><strong>Well Name:</strong> {entry.wellName}</p>
                  <p><strong>Status:</strong> {entry.status}</p>
                  <p><strong>Qg:</strong> {entry.qg} MMSCMD</p>
                  <p><strong>Qc:</strong> {entry.qc} m³/day</p>
                  <p><strong>Qw:</strong> {entry.qw} m³/day</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default DataEntry;
