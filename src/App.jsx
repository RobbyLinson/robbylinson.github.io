import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import WellRounded from './pages/WellRounded';
import PdfCombiner from './pages/tools/PdfCombiner';
import ImageConverter from './pages/tools/ImageConverter';
import BackgroundRemover from './pages/tools/BackgroundRemover';

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
