import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Dailies from './pages/Dailies';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dailies" element={<Dailies />} />
    </Routes>
  );
}

export default App;
