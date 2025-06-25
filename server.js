const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const authRoutes = require('./server/api/auth');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// CSV file paths
const wellDataPath = path.join(dataDir, 'well_data.csv');
const usersPath = path.join(__dirname, 'src', 'data', 'users.csv');

// Create well_data.csv file with headers if it doesn't exist
if (!fs.existsSync(wellDataPath)) {
  const headers = 'Place,Well Name,Status,FTHP (psi),Qg (MMSCMD),Qc (m³/day),Qw (m³/day),Latitude,Longitude,Reason,Plan,Timestamp\n';
  fs.writeFileSync(wellDataPath, headers);
}

// Create users.csv file with headers if it doesn't exist
if (!fs.existsSync(usersPath)) {
  const headers = 'name,username,password\n';
  fs.writeFileSync(usersPath, headers);
}

// Ensure users.csv is readable and writable
try {
  fs.accessSync(usersPath, fs.constants.R_OK | fs.constants.W_OK);
} catch (err) {
  console.error('Error: users.csv is not accessible');
  // Create the directory if it doesn't exist
  const usersDirPath = path.dirname(usersPath);
  if (!fs.existsSync(usersDirPath)) {
    fs.mkdirSync(usersDirPath, { recursive: true });
  }
  // Create the file with headers
  const headers = 'name,username,password\n';
  fs.writeFileSync(usersPath, headers);
}

// Endpoint to save well data
app.post('/api/save-well-data', (req, res) => {
  try {
    const { place, wellName, status, fthp, qg, qc, qw, latitude, longitude, reason, plan } = req.body;
    const timestamp = new Date().toISOString();
    
    // Format data as CSV row, handling empty values
    const csvRow = `"${place}","${wellName}","${status}",${fthp || ''},${qg || ''},${qc || ''},${qw || ''},${latitude},${longitude},"${reason || ''}","${plan || ''}","${timestamp}"\n`;
    
    // Append to CSV file
    fs.appendFileSync(wellDataPath, csvRow);
    
    // Also update the wells.json file
    const wellsJsonPath = path.join(__dirname, 'src', 'data', 'wells.json');
    let wells = [];
    try {
      const wellsData = fs.readFileSync(wellsJsonPath, 'utf8');
      wells = JSON.parse(wellsData);
    } catch (error) {
      console.error('Error reading wells.json:', error);
    }

    // Add new well data
    const newWell = {
      name: wellName,
      location: place,
      status,
      lat: parseFloat(latitude),
      long: parseFloat(longitude)
    };

    // Add optional fields if they exist
    if (fthp) newWell.fthp = parseFloat(fthp);
    if (qg) newWell.qg = parseFloat(qg);
    if (qc) newWell.qc = parseFloat(qc);
    if (qw) newWell.qw = parseFloat(qw);
    if (reason) newWell.reason = reason;
    if (plan) newWell.plan = plan;

    // Add to wells array
    wells.push(newWell);

    // Save updated wells data
    fs.writeFileSync(wellsJsonPath, JSON.stringify(wells, null, 2));
    
    res.json({ success: true, message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ success: false, message: 'Error saving data' });
  }
});

// API routes
app.use('/api/auth', authRoutes);

// Serve static files
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 