import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';
import { useArticles } from '../context/ArticleContext';

const NewArticle = () => {
  const navigate = useNavigate();
  const { account } = useWeb3();
  const { addArticle } = useArticles();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addArticle(
        title, 
        content, 
        account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'Anonim'
      );
      navigate('/articles');
    } catch (error) {
      console.error('Makale kaydetme hatası:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Yeni Makale</h1>
      
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
            placeholder="En az 5 karakter girmelisiniz..."
          />
          <p className="mt-1 text-sm text-gray-500">
            {content.length} karakter ({content.length < 5 ? `${5 - content.length} karakter daha gerekli` : 'yeterli'})
          </p>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/articles')}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            İptal
          </button>
          <button
            type="submit"
            disabled={loading || content.length < 5}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewArticle; 