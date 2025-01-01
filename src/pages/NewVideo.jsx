import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';
import { useYouTube } from '../context/YouTubeContext';

const NewVideo = () => {
  const navigate = useNavigate();
  const { account } = useWeb3();
  const { addVideo } = useYouTube();
  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!videoUrl.includes('youtube.com/watch?v=')) {
        throw new Error('Geçerli bir YouTube linki giriniz');
      }

      await addVideo(
        title,
        videoUrl,
        description,
        account || 'Anonim'
      );
      navigate('/youtube-lessons');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center space-x-4 mb-6">
        <Link
          to="/youtube-lessons"
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="ml-2">Geri Dön</span>
        </Link>
        <h1 className="text-3xl font-bold">Yeni Video Ekle</h1>
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
          />
        </div>

        <div>
          <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700 mb-2">
            YouTube Video Linki
          </label>
          <input
            type="url"
            id="videoUrl"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            required
            placeholder="https://www.youtube.com/watch?v=..."
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Açıklama
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent min-h-[200px]"
            required
            minLength={10}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Link
            to="/youtube-lessons"
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            İptal
          </Link>
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

export default NewVideo; 