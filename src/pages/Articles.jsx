import { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useArticles } from '../context/ArticleContext';
import DeleteModal from '../components/DeleteModal';

// Article tipi tanımı
const ArticleShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  authorAddress: PropTypes.string.isRequired,
  authorDisplayName: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
});

// Article bileşeni
const ArticleCard = ({ article }) => {
  const navigate = useNavigate();
  const { deleteArticle } = useArticles();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  const truncateContent = useCallback((content = '') => {
    return content.length > 150 ? `${content.substring(0, 150)}...` : content;
  }, []);

  const handleDelete = (e) => {
    e.preventDefault();
    deleteArticle(article.id);
  };

  return (
    <>
      <Link
        to={`/articles/${article.id}`}
        className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow relative group"
      >
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate(`/articles/${article.id}/edit`);
            }}
            className="p-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Düzenle
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsDeleteModalOpen(true);
            }}
            className="p-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Sil
          </button>
        </div>

        <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
        <p className="text-gray-600 max-h-[3em] overflow-hidden">
          {truncateContent(article.content)}
        </p>
        <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
          <span>{new Date(article.createdAt).toLocaleDateString('tr-TR')}</span>
          <span>{article.authorDisplayName}</span>
        </div>
      </Link>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title={`"${article.title}" Makalesini Sil`}
      />
    </>
  );
};

ArticleCard.propTypes = {
  article: ArticleShape.isRequired,
};

// Ana bileşen
const Articles = () => {
  const { articles } = useArticles();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Makaleler</h1>
        <Link
          to="/articles/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Yeni Makale Ekle
        </Link>
      </div>

      {articles.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
          Henüz makale eklenmemiş.
        </div>
      ) : (
        <div className="grid gap-6">
          {articles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Articles; 