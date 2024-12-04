import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // Make sure the CSS is imported

function LandingPage() {
  return (
    <div className="landing-container">
      <div className="content-container">
        <h1>Welcome to the Eczema Tracker</h1>
        <Link to="/form">
          <button className="btn btn-primary">Go to Form</button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
