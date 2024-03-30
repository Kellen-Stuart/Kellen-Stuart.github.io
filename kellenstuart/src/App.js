// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Resume from './components/Resume';
import KSNavbar from './components/KSNavbar';
import CoverLetter from './components/CoverLetter';
// Import other pages/components you have

function App() {
  return (
    <Router>
      <KSNavbar />
      <Routes>
        <Route path="/" element={<CoverLetter />} />
        <Route path="/resume" element={<Resume />} />
        {/* Define other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
