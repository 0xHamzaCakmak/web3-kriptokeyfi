import { useEffect, useState } from 'react';
import { useWeb3 } from '../context/Web3Context';
import { usePrice } from '../context/PriceContext';
import { ethers } from 'ethers';

// ERC20 Token ABI - sadece bakiye sorgulamak için gereken fonksiyonlar
const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)"
];

// Popüler ERC20 token'ların adresleri
const TOKENS = {
  USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  LINK: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
  UNI: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
  // Diğer token'lar eklenebilir
};

const WalletPage = () => {
  const { account, web3Provider } = useWeb3();
  const { calculateUsdValue } = usePrice();
  const [ethBalance, setEthBalance] = useState('0');
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalances = async () => {
      if (account && web3Provider) {
        try {
          setLoading(true);
          
          // ETH bakiyesini al
          const balanceWei = await web3Provider.getBalance(account);
          const balanceEth = ethers.utils.formatEther(balanceWei);
          setEthBalance(parseFloat(balanceEth).toFixed(6));

          // Token bakiyelerini al
          const tokenPromises = Object.entries(TOKENS).map(async ([name, address]) => {
            const contract = new ethers.Contract(address, ERC20_ABI, web3Provider);
            try {
              const balance = await contract.balanceOf(account);
              const decimals = await contract.decimals();
              const symbol = await contract.symbol();
              const formattedBalance = ethers.utils.formatUnits(balance, decimals);
              
              return {
                name,
                symbol,
                balance: parseFloat(formattedBalance).toFixed(6),
                address
              };
            } catch (error) {
              console.error(`Token bakiye hatası (${name}):`, error);
              return null;
            }
          });

          const tokenBalances = (await Promise.all(tokenPromises))
            .filter(token => token && parseFloat(token.balance) > 0);
          
          setTokens(tokenBalances);
        } catch (error) {
          console.error('Bakiye getirme hatası:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBalances();
  }, [account, web3Provider]);

  if (!account) {
    return (
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="pl-4">
          <div className="bg-white shadow-lg rounded-lg p-6 mt-8">
            <p className="text-center text-lg">
              Lütfen cüzdanınızı bağlayın.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <p className="text-xl">Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1280px] mx-auto px-4">
      <div className="pl-4">
        <div className="bg-white shadow-lg rounded-lg p-6 mt-8">
          <h2 className="text-2xl font-bold mb-6">Cüzdan Bilgileri</h2>
          
          <div className="space-y-6">
            <div className="flex items-start border-b pb-4">
              <span className="font-semibold w-32">Adres:</span>
              <span className="text-gray-600 break-all">{account}</span>
            </div>
            
            <div className="flex items-center border-b pb-4">
              <span className="font-semibold w-32">ETH Bakiye:</span>
              <span className="text-gray-600">
                {ethBalance} ETH (${calculateUsdValue(ethBalance)})
              </span>
            </div>

            {tokens.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Tokenlar</h3>
                {tokens.map((token) => (
                  <div key={token.address} className="flex items-center border-b pb-4">
                    <span className="font-semibold w-32">{token.symbol}:</span>
                    <span className="text-gray-600">
                      {token.balance} {token.symbol}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPage; 