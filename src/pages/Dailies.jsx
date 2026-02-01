import React from 'react';
import { Link } from 'react-router-dom';

function Dailies() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Dailies</h1>
      <p>This is the Dailies page. Add your daily content here.</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default Dailies;
