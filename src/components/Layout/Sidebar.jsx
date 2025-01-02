import { Link, useLocation } from 'react-router-dom';

const MENU_ITEMS = [
  { path: '/', label: 'Ana Sayfa', icon: '🏠' },
  { path: '/coins', label: 'Coin Listesi', icon: '📈' },
  { path: '/wallet', label: 'Cüzdan', icon: '👛' },
  { path: '/watchlist', label: 'Favorilerim', icon: '⭐' },
  { path: '/youtube-lessons', label: 'YouTube İçerikleri', icon: '🎥' },
  { path: '/articles', label: 'Makaleler', icon: '📚' },
  { path: '/about', label: 'Hakkımızda', icon: 'ℹ️' },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-zinc-800 shadow-lg fixed h-full pt-16">
      <nav className="mt-8">
        <ul className="space-y-2">
          {MENU_ITEMS.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-6 py-3 text-gray-300 hover:bg-zinc-700 hover:text-white transition-colors
                  ${location.pathname === item.path ? 'bg-zinc-700 text-white border-r-4 border-indigo-500' : ''}`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar; 