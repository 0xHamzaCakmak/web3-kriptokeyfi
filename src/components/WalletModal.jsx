import { useState } from 'react';
import PropTypes from 'prop-types';

const WALLET_OPTIONS = [
  {
    id: 'metamask',
    name: 'MetaMask',
    icon: 'https://raw.githubusercontent.com/MetaMask/brand-resources/master/SVG/metamask-fox.svg',
    description: 'En popüler kripto cüzdanı'
  }
];

const NETWORKS = [
  {
    id: '1',
    name: 'Ethereum',
    icon: 'https://ethereum.org/static/6b935ac0e6194247347855dc3d328e83/13c43/eth-diamond-black.png',
    symbol: 'ETH'
  },
  {
    id: '56',
    name: 'BNB Smart Chain',
    icon: 'https://bin.bnbstatic.com/static/images/common/favicon.ico',
    symbol: 'BNB'
  }
];

const WalletModal = ({ isOpen, onClose, onConnect }) => {
  const [selectedNetwork, setSelectedNetwork] = useState(NETWORKS[0]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Cüzdan Bağla</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Ağ Seç</h3>
          <div className="space-y-2">
            {NETWORKS.map((network) => (
              <button
                key={network.id}
                className={`w-full flex items-center p-4 rounded-lg hover:bg-gray-50 border ${
                  selectedNetwork.id === network.id ? 'border-indigo-500' : 'border-gray-200'
                }`}
                onClick={() => setSelectedNetwork(network)}
              >
                <img src={network.icon} alt={network.name} className="w-8 h-8 mr-3" />
                <span>{network.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Cüzdan Seç</h3>
          <div className="space-y-2">
            {WALLET_OPTIONS.map((wallet) => (
              <button
                key={wallet.id}
                className="w-full flex items-center p-4 rounded-lg hover:bg-gray-50 border border-gray-200"
                onClick={() => onConnect(wallet.id, selectedNetwork.id)}
              >
                <img src={wallet.icon} alt={wallet.name} className="w-8 h-8 mr-3" />
                <div className="text-left">
                  <div className="font-semibold">{wallet.name}</div>
                  <div className="text-sm text-gray-500">{wallet.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

WalletModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConnect: PropTypes.func.isRequired,
};

export default WalletModal; 