import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FavoritesList.css';

function FavoritesList() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadFavorites = () => {
      const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setFavorites(storedFavorites);
    };

    loadFavorites();
    
    const handleStorageChange = (e) => {
      if (e.key === 'favorites') {
        loadFavorites();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const removeFavorite = (e, countryToRemove) => {
    e.stopPropagation();
    const updatedFavorites = favorites.filter(country => country.cca3 !== countryToRemove.cca3);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  if (favorites.length === 0) {
    return (
      <div className="empty-state">
        <h2>Your Favorites</h2>
        <p>No favorite countries added yet!</p>
      </div>
    );
  }

  return (
    <div className="favorites-container">
      <div className="favorites-header">
        <h2>Your Favorite Countries ({favorites.length}/5)</h2>
      </div>
      
      <div className="favorites-grid">
        {favorites.map((country) => (
          <div 
            key={country.cca3} 
            className="favorite-card"
            onClick={() => navigate(`/country/${country.name.common}`)}
          >
            <div className="flag-container">
              <img 
                src={country.flags.png} 
                alt={`${country.name.common} flag`}
                className="country-flag"
              />
              <button
                className="remove-btn"
                onClick={(e) => removeFavorite(e, country)}
                title="Remove from favorites"
              >
                ×
              </button>
            </div>
            
            <div className="country-info">
              <h3>{country.name.common}</h3>
              
              <div className="country-details">
                <div className="detail-item">
                  <span className="label">Population:</span>
                  <span className="value">
                    {country.population.toLocaleString()}
                  </span>
                </div>
                
                <div className="detail-item">
                  <span className="label">Region:</span>
                  <span className="value">{country.region}</span>
                </div>
                
                {country.capital && (
                  <div className="detail-item">
                    <span className="label">Capital:</span>
                    <span className="value">{country.capital[0]}</span>
                  </div>
                )}

                <div className="detail-item">
                  <span className="label">Languages:</span>
                  <span className="value">
                    {Object.values(country.languages || {}).join(', ')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoritesList;