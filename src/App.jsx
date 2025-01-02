import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import CoinList from './pages/CoinList';
import WalletPage from './pages/WalletPage';
import YouTubeLessons from './pages/YouTubeLessons';
import CodeExamples from './pages/CodeExamples';
import Articles from './pages/Articles';
import About from './pages/About';
import { Web3Provider } from './context/Web3Context';
import { PriceProvider } from './context/PriceContext';
import { FavoriteProvider } from './context/FavoriteContext';
import Watchlist from './pages/Watchlist';
import CoinDetail from './pages/CoinDetail';
import NewArticle from './pages/NewArticle';
import { ArticleProvider } from './context/ArticleContext';
import ArticleDetail from './pages/ArticleDetail';
import EditArticle from './pages/EditArticle';
import NewVideo from './pages/NewVideo';
import { YouTubeProvider } from './context/YouTubeContext';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Web3Provider>
      <PriceProvider>
        <FavoriteProvider>
          <ArticleProvider>
            <YouTubeProvider>
              <Router>
                <Layout>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/coins" element={<CoinList />} />
                    <Route path="/wallet" element={<WalletPage />} />
                    <Route path="/watchlist" element={<Watchlist />} />
                    <Route path="/youtube-lessons" element={<YouTubeLessons />} />
                    <Route path="/youtube-lessons/new" element={<NewVideo />} />
                    <Route path="/code-examples" element={<CodeExamples />} />
                    <Route path="/articles" element={<Articles />} />
                    <Route path="/articles/new" element={<NewArticle />} />
                    <Route path="/articles/:articleId" element={<ArticleDetail />} />
                    <Route path="/articles/:articleId/edit" element={<EditArticle />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/coin/:coinId" element={<CoinDetail />} />
                  </Routes>
                </Layout>
              </Router>
            </YouTubeProvider>
          </ArticleProvider>
        </FavoriteProvider>
      </PriceProvider>
    </Web3Provider>
  );
}

export default App;
