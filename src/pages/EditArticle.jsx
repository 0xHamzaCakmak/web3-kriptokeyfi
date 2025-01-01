import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useArticles } from '../context/ArticleContext';

const EditArticle = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const { articles, updateArticle } = useArticles();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Makale verilerini yükle
  useEffect(() => {
    const article = articles.find(a => a.id === articleId);
    if (article) {
      setTitle(article.title);
      setContent(article.content);
    } else {
      navigate('/articles');
    }
  }, [articleId, articles, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (title.length < 3) {
        throw new Error('Başlık en az 3 karakter olmalıdır');
      }
      if (content.length < 5) {
        throw new Error('İçerik en az 5 karakter olmalıdır');
      }

      updateArticle(articleId, {
        title,
        content,
        updatedAt: new Date().toISOString()
      });

      navigate(`/articles/${articleId}`);
    } catch (error) {
      console.error('Makale güncelleme hatası:', error);
      setError(error.message || 'Makale güncellenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Link
            to={`/articles/${articleId}`}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="ml-2">Geri Dön</span>
          </Link>
          <h1 className="text-3xl font-bold">Makaleyi Düzenle</h1>
        </div>
      </div>
      
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Başlık
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            required
            minLength={3}
            maxLength={100}
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            İçerik
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent min-h-[300px]"
            required
            minLength={5}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate(`/articles/${articleId}`)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            İptal
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditArticle; 