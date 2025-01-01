import PropTypes from 'prop-types';

const VideoPlayer = ({ isOpen, onClose, video }) => {
  if (!isOpen || !video) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Arka plan overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-75"
        onClick={onClose}
      />
      
      {/* Modal içeriği */}
      <div className="bg-white rounded-lg w-full max-w-4xl mx-4 relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl font-semibold">{video.title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Video Player */}
        <div className="relative pb-[56.25%] h-0">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${video.videoId}`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Video Detayları */}
        <div className="p-4">
          <p className="text-gray-600 mb-4">{video.description}</p>
          <div className="flex justify-between text-sm text-gray-500">
            <span>{video.authorDisplayName}</span>
            <span>{new Date(video.createdAt).toLocaleDateString('tr-TR')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

VideoPlayer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  video: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    videoId: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    authorDisplayName: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }),
};

export default VideoPlayer; 