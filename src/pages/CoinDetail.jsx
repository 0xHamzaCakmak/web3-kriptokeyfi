import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useWatchlist } from '../context/FavoriteContext';

const CoinDetail = () => {
  const { coinId } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isFavorite, addToFavorites, removeFromFavorites } = useWatchlist();

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`
        );
        const data = await response.json();
        setCoin(data);
      } catch (error) {
        console.error('Coin detay hatası:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [coinId]);

  useEffect(() => {
    const container = document.getElementById('tradingview_chart');
    if (container) {
      container.innerHTML = '';
    }

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (coin && window.TradingView) {
        new window.TradingView.widget({
          container_id: "tradingview_chart",
          symbol: `BINANCE:${coin.symbol.toUpperCase()}USDT`,
          interval: "D",
          timezone: "Europe/Istanbul",
          theme: "dark",
          style: "1",
          locale: "tr",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          allow_symbol_change: true,
          save_image: false,
          width: "100%",
          height: 600,
          autosize: false,
        });
      }
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [coin, coinId]);

  if (loading || !coin) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-xl">Yükleniyor...</p>
      </div>
    );
  }

  const symbol = coin.symbol.toUpperCase();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <img src={coin.image.large} alt={coin.name} className="w-12 h-12" />
          <div>
            <h1 className="text-3xl font-bold">{coin.name}</h1>
            <p className="text-gray-500">{symbol}</p>
          </div>
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

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-2 gap-4 p-4 border-b">
          <div>
            <p className="text-gray-500">Fiyat</p>
            <p className="text-2xl font-bold">
              ${coin.market_data.current_price.usd.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-gray-500">24s Değişim</p>
            <p className={`text-xl font-bold ${
              coin.market_data.price_change_percentage_24h > 0 
                ? 'text-green-600' 
                : 'text-red-600'
            }`}>
              {coin.market_data.price_change_percentage_24h.toFixed(2)}%
            </p>
          </div>
        </div>

        <div className="w-full h-[600px]">
          <div id="tradingview_chart" className="w-full h-full"></div>
        </div>
      </div>
    </div>
  );
};

export default CoinDetail; 