import React, { useState } from 'react';

const DataEntryForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    place: '',
    wellName: '',
    status: 'Flowing',
    qg: '',
    qc: '',
    qw: '',
    fthp: '',
    reason: '',
    plan: '',
    latitude: '',
    longitude: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.place || !formData.wellName || !formData.latitude || !formData.longitude) {
      setError("Please fill all required fields.");
      return;
    }

    setIsSubmitting(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/save-well-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage('Data saved successfully!');
        onSubmit(formData); // Pass form data to parent component
        setFormData({
          place: '',
          wellName: '',
          status: 'Flowing',
          qg: '',
          qc: '',
          qw: '',
          fthp: '',
          reason: '',
          plan: '',
          latitude: '',
          longitude: ''
        });
      } else {
        setError('Failed to save data. Please try again.');
      }
    } catch (err) {
      setError('Error connecting to server. Please try again.');
      console.error('Error submitting form:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg space-y-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Oil Well Data Entry</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{successMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block font-medium text-gray-700 mb-2">Place *</label>
          <input
            type="text"
            name="place"
            value={formData.place}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-2">Well Name *</label>
          <input
            type="text"
            name="wellName"
            value={formData.wellName}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-2">Status *</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="Flowing">Flowing</option>
            <option value="Sick">Sick</option>
            <option value="Dry/Abandoned">Dry/Abandoned</option>
          </select>
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-2">FTHP (psi)</label>
          <input
            type="number"
            step="any"
            name="fthp"
            value={formData.fthp}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-2">Qg (Gas, MMSCMD)</label>
          <input
            type="number"
            step="any"
            name="qg"
            value={formData.qg}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-2">Qc (Condensate, m³/day)</label>
          <input
            type="number"
            step="any"
            name="qc"
            value={formData.qc}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-2">Qw (Water, m³/day)</label>
          <input
            type="number"
            step="any"
            name="qw"
            value={formData.qw}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-2">Latitude *</label>
          <input
            type="number"
            step="any"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            placeholder="e.g., 23.7645"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-2">Longitude *</label>
          <input
            type="number"
            step="any"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            placeholder="e.g., 91.3562"
          />
        </div>
      </div>

      <div className="space-y-6 mt-6">
        <div>
          <label className="block font-medium text-gray-700 mb-2">Reason (if Sick or Abandoned)</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="3"
            placeholder="Enter the reason for sick or abandoned status"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-2">Plan (if Sick)</label>
          <textarea
            name="plan"
            value={formData.plan}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="3"
            placeholder="Enter the remedial plan"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors duration-200 mt-6 ${
          isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isSubmitting ? 'Saving...' : 'Submit'}
      </button>
    </form>
  );
};

export default DataEntryForm;
