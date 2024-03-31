import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Resume from './components/Resume';
import KSNavbar from './components/KSNavbar';
import CoverLetter from './components/CoverLetter';
import Contact from './components/Contact';
import CharacterSheet from './components/CharacterSheet';
import './App.css';

function App() {
  return (
    <Router>
      <KSNavbar />
      <Routes>
        <Route path="/" element={<CoverLetter />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/character" element={<CharacterSheet />} />
      </Routes>
    </Router>
  );
}

export default App;
