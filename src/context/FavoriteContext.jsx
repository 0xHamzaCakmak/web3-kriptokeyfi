import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const FavoriteContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useWatchlist = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error('useWatchlist must be used within a FavoriteProvider');
  }
  return context;
};

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (coin) => {
    setFavorites(prev => {
      if (!prev.find(item => item.id === coin.id)) {
        return [...prev, coin];
      }
      return prev;
    });
  };

  const removeFromFavorites = (coinId) => {
    setFavorites(prev => prev.filter(coin => coin.id !== coinId));
  };

  const isFavorite = (coinId) => {
    return favorites.some(coin => coin.id === coinId);
  };

  return (
    <FavoriteContext.Provider value={{ 
      favorites, 
      addToFavorites, 
      removeFromFavorites, 
      isFavorite 
    }}>
      {children}
    </FavoriteContext.Provider>
  );
};

FavoriteProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FavoriteProvider; 