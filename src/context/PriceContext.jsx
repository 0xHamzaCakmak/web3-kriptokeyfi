import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const PriceContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const usePrice = () => {
  const context = useContext(PriceContext);
  if (!context) {
    throw new Error('usePrice must be used within a PriceProvider');
  }
  return context;
};

export const PriceProvider = ({ children }) => {
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        // Ethereum fiyatını al
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
        );
        const data = await response.json();
        setPrices(data);
      } catch (error) {
        console.error('Fiyat getirme hatası:', error);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000); // Her dakika güncelle

    return () => clearInterval(interval);
  }, []);

  const calculateUsdValue = (amount) => {
    if (!amount || !prices.ethereum) return '0.00';
    const usdPrice = prices.ethereum.usd;
    return (parseFloat(amount) * usdPrice).toFixed(2);
  };

  return (
    <PriceContext.Provider value={{ prices, calculateUsdValue }}>
      {children}
    </PriceContext.Provider>
  );
};

PriceProvider.propTypes = {
  children: PropTypes.node.isRequired,
}; 