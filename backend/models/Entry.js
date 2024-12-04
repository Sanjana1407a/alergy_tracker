const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  date: { type: String, required: true },
  severity: { type: String, required: true },
  areasOfItch: { type: [String], required: true },
  foodsConsumed: { type: String, required: true },
  humidity: { type: Number, required: true },
  moisturized: { type: Boolean, required: true },
  newProductsUsed: { type: [String], required: false }, 
  dustExposure: { type: Boolean, required: true },
pollenExposure: { type: Boolean, required: true },

  stressLevels: { type: String, required: true },
  sunExposure: { type: String, required: true },
  temperature: { type: Number, required: true },
});

const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;
