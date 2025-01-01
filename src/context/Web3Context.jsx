import { createContext, useContext, useState } from 'react';
import { ethers } from 'ethers';
import PropTypes from 'prop-types';

const Web3Context = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [web3Provider, setWeb3Provider] = useState(null);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed');
      }

      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      
      setWeb3Provider(provider);
      setAccount(address);

      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setAccount(null);
          setWeb3Provider(null);
        }
      });

    } catch (error) {
      console.error('Bağlantı hatası:', error);
      throw error;
    }
  };

  const disconnectWallet = () => {
    if (window.ethereum) {
      window.ethereum.removeListener('accountsChanged', () => {});
    }
    setAccount(null);
    setWeb3Provider(null);
  };

  return (
    <Web3Context.Provider value={{ 
      account, 
      web3Provider,
      connectWallet, 
      disconnectWallet
    }}>
      {children}
    </Web3Context.Provider>
  );
};

Web3Provider.propTypes = {
  children: PropTypes.node.isRequired,
}; 