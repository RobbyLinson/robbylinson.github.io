import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import WellRounded from './pages/WellRounded';
import PdfCombiner from './pages/tools/PdfCombiner';
import ImageConverter from './pages/tools/ImageConverter';
import BackgroundRemover from './pages/tools/BackgroundRemover';
import QrGenerator from './pages/tools/QrGenerator';
import CaseStudyPage from './pages/projects/CaseStudyPage';
import { neutralize } from './data/caseStudies/neutralize';
import OllieBirthdayCard from './pages/extras/OllieBirthdayCard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/well-rounded" element={<WellRounded />} />
      <Route path="/tools/pdf-combiner" element={<PdfCombiner />} />
      <Route path="/tools/image-converter" element={<ImageConverter />} />
      <Route path="/tools/background-remover" element={<BackgroundRemover />} />
      <Route path="/tools/qr-generator" element={<QrGenerator />} />
      <Route
        path="/projects/neutralize"
        element={<CaseStudyPage data={neutralize} />}
      />
      <Route
        path="/extras/ollie-birthday-card"
        element={<OllieBirthdayCard />}
      />
    </Routes>
  );
}

export default App;
