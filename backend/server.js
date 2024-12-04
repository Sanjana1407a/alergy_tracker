const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./db');  // Import the connectDB function

// Import the Entry model
const Entry = require('./models/Entry'); // We'll define this model shortly

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

// POST route to save form data into the database
app.post('/test-entry', async (req, res) => {
  try {
    // Destructure the form data from the request body
    const { date, severity, areasOfItch, foodsConsumed, moisturized, pollenExposure,
      dustExposure, humidity, newProductsUsed, stressLevels, sunExposure, temperature } = req.body;

    // Create a new entry object using the data from the form
    const newEntry = new Entry({
      date,
      severity,
      areasOfItch,
      foodsConsumed,
      moisturized,
      pollenExposure,
      dustExposure,
      humidity,
      newProductsUsed,
      stressLevels,
      sunExposure,
      temperature
    });

    // Save the entry to the database
    await newEntry.save();

    // Send a success response
    res.status(201).json({ message: 'Entry successfully saved' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving entry' });
  }
});



// Example route to test if the backend is working
app.get('/test-entry', (req, res) => {
  res.json({ message: 'Test entry successful' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
