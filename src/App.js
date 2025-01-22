import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import CountryList from './components/CountryList/CountryList';
import CountryDetails from './components/CountryDetails/CountryDetails';
import FavoritesList from './components/FavoritesList/FavoritesList';
import './App.css';

function App() {
  return (
    <Router>
      <div className="appwrapper">
        {/* Background Effects */}
        <div className="bgeffects">
          <div className="orb orb1"></div>
          <div className="orb orb2"></div>
          <div className="orb orb3"></div>
        </div>

        {/* Premium Navbar */}
        <Navbar />
        
        {/* Main Content */}
        <main className="mainwrap">
          <div className="contentwrap glasseffect">
            <Routes>
              <Route path="/" element={<CountryList />} />
              <Route path="/country/:name" element={<CountryDetails />} />
              <Route path="/favorites" element={<FavoritesList />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App; 