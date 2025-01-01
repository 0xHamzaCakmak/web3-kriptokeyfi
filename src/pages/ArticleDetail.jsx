import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useArticles } from '../context/ArticleContext';
import DeleteModal from '../components/DeleteModal';

const ArticleDetail = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const { articles, updateArticle, deleteArticle } = useArticles();
  
  const article = articles.find(a => a.id === articleId);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(article?.title || '');
  const [editedContent, setEditedContent] = useState(article?.content || '');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto mt-8">
        <p className="text-center text-gray-500">Makale bulunamadı.</p>
      </div>
    );
  }

  const handleEdit = () => {
    setIsEditing(true);
    setEditedTitle(article.title);
    setEditedContent(article.content);
  };

  const handleSave = () => {
    if (editedTitle.length < 3 || editedContent.length < 5) {
      alert('Başlık en az 3, içerik en az 5 karakter olmalıdır.');
      return;
    }

    updateArticle(article.id, {
      title: editedTitle,
      content: editedContent,
      updatedAt: new Date().toISOString()
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteArticle(article.id);
    navigate('/articles');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/articles"
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="ml-2">Makalelere Dön</span>
          </Link>
          <h1 className="text-3xl font-bold">{article.title}</h1>
        </div>

        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Kaydet
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                İptal
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleEdit}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Düzenle
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Sil
              </button>
            </>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        {isEditing ? (
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg min-h-[300px]"
            minLength={5}
          />
        ) : (
          <div className="prose max-w-none">
            {article.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        )}
      </div>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title={`"${article.title}" Makalesini Sil`}
      />
    </div>
  );
};

export default ArticleDetail; 