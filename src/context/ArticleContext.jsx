import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ArticleContext = createContext(null);

export const useArticles = () => {
  const context = useContext(ArticleContext);
  if (!context) {
    throw new Error('useArticles must be used within an ArticleProvider');
  }
  return context;
};

export const ArticleProvider = ({ children }) => {
  const [articles, setArticles] = useState(() => {
    try {
      const saved = localStorage.getItem('articles');
      const parsedArticles = saved ? JSON.parse(saved) : [];
      
      return parsedArticles.filter(article => (
        article &&
        typeof article.id === 'string' &&
        typeof article.title === 'string' &&
        typeof article.content === 'string' &&
        typeof article.authorAddress === 'string' &&
        typeof article.authorDisplayName === 'string' &&
        typeof article.createdAt === 'string'
      ));
    } catch (error) {
      console.error('Article verisi yüklenirken hata:', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('articles', JSON.stringify(articles));
    } catch (error) {
      console.error('Article verisi kaydedilirken hata:', error);
    }
  }, [articles]);

  const addArticle = (title, content, authorAddress) => {
    const newArticle = {
      id: Date.now().toString(),
      title,
      content,
      authorAddress,
      authorDisplayName: `${authorAddress.slice(0, 6)}...${authorAddress.slice(-4)}`,
      createdAt: new Date().toISOString()
    };
    setArticles(prev => [newArticle, ...prev]);
  };

  const isArticleOwner = (articleId, address) => {
    const article = articles.find(a => a.id === articleId);
    return article && article.authorAddress.toLowerCase() === address?.toLowerCase();
  };

  const deleteArticle = (id) => {
    try {
      setArticles(prev => prev.filter(article => article.id !== id));
      const updatedArticles = articles.filter(article => article.id !== id);
      localStorage.setItem('articles', JSON.stringify(updatedArticles));
    } catch (error) {
      console.error('Makale silme hatası:', error);
      throw error;
    }
  };

  const updateArticle = (id, updates) => {
    try {
      const updatedArticles = articles.map(article => 
        article.id === id ? { ...article, ...updates } : article
      );
      
      setArticles(updatedArticles);
      
      localStorage.setItem('articles', JSON.stringify(updatedArticles));
    } catch (error) {
      console.error('Makale güncelleme hatası:', error);
      throw error;
    }
  };

  return (
    <ArticleContext.Provider value={{ 
      articles, 
      addArticle, 
      deleteArticle, 
      updateArticle,
      isArticleOwner
    }}>
      {children}
    </ArticleContext.Provider>
  );
};

ArticleProvider.propTypes = {
  children: PropTypes.node.isRequired,
}; 