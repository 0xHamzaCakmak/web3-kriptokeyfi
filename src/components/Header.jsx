import { Link } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';

const Header = () => {
  const { account, connectWallet, disconnectWallet } = useWeb3();

  return (
    <header className="bg-zinc-900 text-white p-4 shadow-md fixed w-full z-10">
      <div className="max-w-[1280px] mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-indigo-400 hover:text-indigo-300 transition-colors">
          KriptoKeyfi
        </Link>
        <div className="flex items-center space-x-6">
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
            onClick={account ? disconnectWallet : connectWallet}
          >
            {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect Wallet'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 