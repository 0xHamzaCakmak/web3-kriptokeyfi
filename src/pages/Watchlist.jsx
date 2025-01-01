import { useWatchlist } from '../context/FavoriteContext';
import { Link } from 'react-router-dom';

const Watchlist = () => {
  const { favorites, removeFromFavorites } = useWatchlist();

  if (favorites.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <p className="text-xl text-gray-500">Favori listeniz boş</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Favori Coinlerim</h1>
      <div className="grid gap-4">
        {favorites.map((coin) => (
          <div key={coin.id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center space-x-4">
              <Link 
                to={`/coin/${coin.id}`}
                className="flex-1 flex items-center space-x-4 hover:opacity-75 transition-opacity"
              >
                <img src={coin.image} alt={coin.name} className="w-8 h-8" />
                <div>
                  <h2 className="font-semibold">{coin.name}</h2>
                  <p className="text-gray-500 text-sm">{coin.symbol.toUpperCase()}</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="font-medium">${coin.current_price.toLocaleString()}</p>
                  <p className={`text-sm ${
                    coin.price_change_percentage_24h > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </p>
                </div>
              </Link>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  removeFromFavorites(coin.id);
                }}
                className="text-2xl focus:outline-none ml-4"
              >
                ⭐
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Watchlist; 