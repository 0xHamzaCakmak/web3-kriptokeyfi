import { useState, useEffect } from 'react';
import { useWatchlist } from '../context/FavoriteContext';
import { Link } from 'react-router-dom';

const CoinList = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [allCoins, setAllCoins] = useState([]);
  const { addToFavorites, removeFromFavorites, isFavorite } = useWatchlist();

  useEffect(() => {
    const fetchAllCoins = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
        );
        const data = await response.json();
        setAllCoins(data);
        setCoins(data.slice(0, 20));
      } catch (error) {
        console.error('Coin listesi çekme hatası:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCoins();
  }, []);

  useEffect(() => {
    const startIndex = (page - 1) * 20;
    const endIndex = startIndex + 20;
    setCoins(allCoins.slice(startIndex, endIndex));
  }, [page, allCoins]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl">Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      <h1 className="text-3xl font-bold">Kripto Para Birimleri</h1>
      <div className="grid gap-4">
        {coins.map((coin, index) => (
          <Link to={`/coin/${coin.id}`} key={coin.id}>
            <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-4">
                <span className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-600 font-semibold">
                  {(page - 1) * 20 + index + 1}
                </span>
                <img src={coin.image} alt={coin.name} className="w-8 h-8" />
                <div>
                  <h2 className="font-semibold">{coin.name}</h2>
                  <p className="text-gray-500 text-sm">{coin.symbol.toUpperCase()}</p>
                </div>
                <div className="ml-auto flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-medium">${coin.current_price.toLocaleString()}</p>
                    <p className={`text-sm ${
                      coin.price_change_percentage_24h > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      isFavorite(coin.id) 
                        ? removeFromFavorites(coin.id)
                        : addToFavorites(coin);
                    }}
                    className="text-2xl focus:outline-none"
                  >
                    {isFavorite(coin.id) ? '⭐' : '☆'}
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map(pageNum => (
              <button
                key={pageNum}
                onClick={() => {
                  setPage(pageNum);
                  window.scrollTo(0, 0);
                }}
                className={`px-4 py-2 rounded ${
                  page === pageNum 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {pageNum}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinList; 