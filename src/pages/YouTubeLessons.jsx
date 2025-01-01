import { Link } from 'react-router-dom';
import { useYouTube } from '../context/YouTubeContext';
import DeleteModal from '../components/DeleteModal';
import VideoPlayer from '../components/VideoPlayer';
import { useState } from 'react';
import PropTypes from 'prop-types';

// Video tipi tanımı
const VideoShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  videoId: PropTypes.string.isRequired,
  videoUrl: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  authorAddress: PropTypes.string.isRequired,
  authorDisplayName: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
});

const VideoCard = ({ video }) => {
  const { deleteVideo } = useYouTube();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const handleDelete = () => {
    deleteVideo(video.id);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative pb-[56.25%] h-0">
          <img
            src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
            alt={video.title}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          <button
            onClick={() => setIsVideoModalOpen(true)}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity"
          >
            <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2">{video.title}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {video.description}
          </p>
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{video.authorDisplayName}</span>
            <span>{new Date(video.createdAt).toLocaleDateString('tr-TR')}</span>
          </div>

          <div className="mt-4 flex justify-end space-x-2">
            <Link
              to={`/youtube-lessons/${video.id}/edit`}
              className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
            >
              Düzenle
            </Link>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
            >
              Sil
            </button>
          </div>
        </div>
      </div>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title={`"${video.title}" Videosunu Sil`}
      />

      <VideoPlayer
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        video={video}
      />
    </>
  );
};

VideoCard.propTypes = {
  video: VideoShape.isRequired,
};

const YouTubeLessons = () => {
  const { videos } = useYouTube();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">YouTube İçerikleri</h1>
        <Link
          to="/youtube-lessons/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Yeni Video Ekle
        </Link>
      </div>

      {videos.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
          Henüz video eklenmemiş.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
};

export default YouTubeLessons; 