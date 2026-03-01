import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Resume from './components/Resume';
import KSNavbar from './components/KSNavbar';
import CoverLetter from './components/CoverLetter';
import Contact from './components/Contact';
import CharacterSheet from './components/CharacterSheet';
import PrintResume from './components/PrintResume';
import BlogIndex from './components/blog/BlogIndex';
import BlogPostPage from './components/blog/BlogPostPage';

function App() {
  return (
    <Router>
      <KSNavbar />
      <Routes>
        <Route path="/" element={<CoverLetter />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/print-resume" element={<PrintResume />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/character" element={<CharacterSheet />} />
      </Routes>
    </Router>
  );
}

export default App;
