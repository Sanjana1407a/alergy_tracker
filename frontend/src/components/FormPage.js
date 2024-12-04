import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FormPage() {
  const [formData, setFormData] = useState({
    date: '',
    severity: 0,
    areasOfItch: [],
    foodsConsumed: [],
    moisturized: false,
    humidity: '',
    temperature: '',
    sunExposure: '',
    dustExposure: '',
    pollenExposure: '',
    newProductsUsed: [],
    stressLevels: 0,
  });

  const [availableAreas, setAvailableAreas] = useState([
    'Hands',
    'Fingers',
    'Feet',
    'Neck',
    'Arms',
    'Legs',
  ]);

  useEffect(() => {
    // Fetch humidity and temperature data for Bangalore when a date is selected
    if (formData.date) {
      // Mock API call to fetch weather data
      axios
        .get('https://api.weatherapi.com/v1/current.json', {
          params: { q: 'Bangalore,Karnataka', key: 'e1addd25f39c4fcb83481838240312' },
        })
        .then((response) => {
          const { humidity, temp_c } = response.data.current;
          setFormData((prevData) => ({
            ...prevData,
            humidity,
            temperature: temp_c,
          }));
        })
        .catch((error) => console.error('Error fetching weather data:', error));
    }
  }, [formData.date]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleMultiSelectChange = (e) => {
    const { options } = e.target;
    const selectedValues = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setFormData((prevData) => ({ ...prevData, areasOfItch: selectedValues }));
  };

  const handleAddNewProduct = () => {
    setFormData((prevData) => ({
      ...prevData,
      newProductsUsed: [...prevData.newProductsUsed, ''],
    }));
  };

  const handleNewProductChange = (index, value) => {
    const updatedProducts = [...formData.newProductsUsed];
    updatedProducts[index] = value;
    setFormData((prevData) => ({ ...prevData, newProductsUsed: updatedProducts }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Submitted', formData);
    try {
      const response = await axios.post('http://localhost:5000/test-entry', formData);
      console.log('Data submitted successfully:', response.data);
      alert('Data saved successfully!');
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Error submitting data');
    }
  };

  return (
    <div className="form-container">
      <h1>Eczema Tracker Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Severity of Itch:</label>
          <input
            type="range"
            name="severity"
            value={formData.severity}
            onChange={handleChange}
            min="0"
            max="10"
            style={{ background: `linear-gradient(to right, white, red)` }}
          />
          <span>{formData.severity}</span>
        </div>
        <div className="form-group">
          <label>Areas of Itch:</label>
          <select
            name="areasOfItch"
            multiple
            value={formData.areasOfItch}
            onChange={handleMultiSelectChange}
          >
            {availableAreas.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Foods Consumed:</label>
          <input
            type="text"
            name="foodsConsumed"
            value={formData.foodsConsumed}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Moisturized:</label>
          <input
            type="checkbox"
            name="moisturized"
            checked={formData.moisturized}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Humidity (%):</label>
          <input type="number" name="humidity" value={formData.humidity} readOnly />
        </div>
        <div className="form-group">
          <label>Temperature (°C):</label>
          <input type="number" name="temperature" value={formData.temperature} readOnly />
        </div>
        <div className="form-group">
          <label>Sun Exposure:</label>
          <select
            name="sunExposure"
            value={formData.sunExposure}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="None">None</option>
            <option value="Low">Low</option>
            <option value="Moderate">Moderate</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="form-group">
          <label>Exposure to Dust:</label>
          <input
            type="checkbox"
            name="dustExposure"
            checked={formData.dustExposure}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Exposure to Pollen:</label>
          <input
            type="checkbox"
            name="pollenExposure"
            checked={formData.pollenExposure}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>New Products Used:</label>
          {formData.newProductsUsed.map((product, index) => (
            <input
              key={index}
              type="text"
              value={product}
              onChange={(e) => handleNewProductChange(index, e.target.value)}
            />
          ))}
          <button type="button" onClick={handleAddNewProduct}>
            Add Product
          </button>
        </div>
        <div className="form-group">
          <label>Stress Levels:</label>
          <input
            type="range"
            name="stressLevels"
            value={formData.stressLevels}
            onChange={handleChange}
            min="0"
            max="10"
          />
          <span>{formData.stressLevels}</span>
        </div>
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  );
}

export default FormPage;
