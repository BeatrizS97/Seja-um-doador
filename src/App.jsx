import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Care from './pages/Care';
import Stories from './pages/Stories';
import Map from './pages/Map';
import './App.css';
import DonationGoalPage from './pages/DonationGoalPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cuidados" element={<Care />} />
          <Route path="/historias" element={<Stories />} />
          <Route path="/hemocentros" element={<Map />} />
          <Route path="/doacao" element={<DonationGoalPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;