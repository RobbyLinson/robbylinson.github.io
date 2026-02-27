import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import WellRounded from './pages/WellRounded';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/well-rounded" element={<WellRounded />} />
    </Routes>
  );
}

export default App;
