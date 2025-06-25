import React, { useState } from 'react';

const DataEntry = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    status: 'Flowing',
    fthp: '',
    qg: '',
    qw: '',
    qc: '',
    lat: '',
    long: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/save-well-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          place: formData.location,
          wellName: formData.name,
          status: formData.status,
          qg: formData.qg,
          qc: formData.qc,
          qw: formData.qw
        }),
      });

      if (response.ok) {
        alert('Well data added successfully!');
        setFormData({
          name: '',
          location: '',
          status: 'Flowing',
          fthp: '',
          qg: '',
          qw: '',
          qc: '',
          lat: '',
          long: ''
        });
      } else {
        alert('Error adding well data');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding well data');
    }
  };

  return (
    <div className="data-entry">
      <h1>Well Data Entry</h1>
      <form onSubmit={handleSubmit} className="data-entry-form">
        <div className="form-group">
          <label htmlFor="name">Well Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="Flowing">Flowing</option>
            <option value="Sick">Sick</option>
            <option value="Dry/Abandoned">Dry/Abandoned</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="fthp">FTHP (psi):</label>
          <input
            type="number"
            id="fthp"
            name="fthp"
            value={formData.fthp}
            onChange={handleChange}
            step="0.01"
          />
        </div>

        <div className="form-group">
          <label htmlFor="qg">Gas Rate (m³/d):</label>
          <input
            type="number"
            id="qg"
            name="qg"
            value={formData.qg}
            onChange={handleChange}
            step="0.01"
          />
        </div>

        <div className="form-group">
          <label htmlFor="qw">Water Rate (m³/d):</label>
          <input
            type="number"
            id="qw"
            name="qw"
            value={formData.qw}
            onChange={handleChange}
            step="0.01"
          />
        </div>

        <div className="form-group">
          <label htmlFor="qc">Condensate Rate (m³/d):</label>
          <input
            type="number"
            id="qc"
            name="qc"
            value={formData.qc}
            onChange={handleChange}
            step="0.01"
          />
        </div>

        <div className="form-group">
          <label htmlFor="lat">Latitude:</label>
          <input
            type="number"
            id="lat"
            name="lat"
            value={formData.lat}
            onChange={handleChange}
            step="0.00000001"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="long">Longitude:</label>
          <input
            type="number"
            id="long"
            name="long"
            value={formData.long}
            onChange={handleChange}
            step="0.00000001"
            required
          />
        </div>

        <button type="submit" className="submit-button">Add Well Data</button>
      </form>
    </div>
  );
};

export default DataEntry; 