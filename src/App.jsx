import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import WellRounded from './pages/WellRounded';
import PdfCombiner from './pages/PdfCombiner';
import ImageConverter from './pages/ImageConverter';
import BackgroundRemover from './pages/BackgroundRemover';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/well-rounded" element={<WellRounded />} />
      <Route path="/tools/pdf-combiner" element={<PdfCombiner />} />
      <Route path="/tools/image-converter" element={<ImageConverter />} />
      <Route path="/tools/background-remover" element={<BackgroundRemover />} />
    </Routes>
  );
}

export default App;
