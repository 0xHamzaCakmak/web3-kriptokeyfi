import PropTypes from 'prop-types';
import { ethers } from 'ethers';

export const TokenTransferItem = ({ tx, account }) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
    <div className="flex-1">
      <div className="flex items-center">
        <span className={`mr-2 ${tx.from.toLowerCase() === account.toLowerCase() ? 'text-red-500' : 'text-green-500'}`}>
          {tx.from.toLowerCase() === account.toLowerCase() ? '↑ Gönderim' : '↓ Alım'}
        </span>
        <span className="text-sm text-gray-600">
          {tx.from.toLowerCase() === account.toLowerCase() ? 
            `To: ${tx.to.slice(0, 6)}...${tx.to.slice(-4)}` : 
            `From: ${tx.from.slice(0, 6)}...${tx.from.slice(-4)}`}
        </span>
      </div>
      <p className="text-sm text-gray-500 mt-1">
        {new Date(Number(tx.timeStamp) * 1000).toLocaleString()}
      </p>
    </div>
    <div className="text-right">
      <p className="font-medium">
        {tx.formattedValue} {tx.tokenSymbol}
      </p>
      <a 
        href={`https://etherscan.io/tx/${tx.hash}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-sm text-indigo-600 hover:text-indigo-800"
      >
        Detaylar →
      </a>
    </div>
  </div>
);

TokenTransferItem.propTypes = {
  tx: PropTypes.shape({
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    timeStamp: PropTypes.string.isRequired,
    hash: PropTypes.string.isRequired,
    tokenSymbol: PropTypes.string.isRequired,
    tokenDecimal: PropTypes.string.isRequired,
    formattedValue: PropTypes.string.isRequired,
  }).isRequired,
  account: PropTypes.string.isRequired,
};

export const TransactionItem = ({ tx }) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
    <div className="flex-1">
      <div className="flex items-center">
        <span className={`mr-2 ${tx.from.toLowerCase() === tx.currentAccount.toLowerCase() ? 'text-red-500' : 'text-green-500'}`}>
          {tx.from.toLowerCase() === tx.currentAccount.toLowerCase() ? '↑ Gönderim' : '↓ Alım'}
        </span>
        <span className="text-sm text-gray-600">
          {tx.from.toLowerCase() === tx.currentAccount.toLowerCase() ? 
            `To: ${tx.to.slice(0, 6)}...${tx.to.slice(-4)}` : 
            `From: ${tx.from.slice(0, 6)}...${tx.from.slice(-4)}`}
        </span>
      </div>
      <p className="text-sm text-gray-500 mt-1">
        {new Date(Number(tx.timeStamp) * 1000).toLocaleString()}
      </p>
    </div>
    <div className="text-right">
      <p className="font-medium">
        {ethers.utils.formatEther(tx.value)} ETH
      </p>
      <a 
        href={`https://etherscan.io/tx/${tx.hash}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-sm text-indigo-600 hover:text-indigo-800"
      >
        Detaylar →
      </a>
    </div>
  </div>
);

TransactionItem.propTypes = {
  tx: PropTypes.shape({
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    timeStamp: PropTypes.string.isRequired,
    hash: PropTypes.string.isRequired,
    currentAccount: PropTypes.string.isRequired,
  }).isRequired,
}; 