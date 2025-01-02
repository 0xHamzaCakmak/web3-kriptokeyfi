import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const YouTubeContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useYouTube = () => {
  const context = useContext(YouTubeContext);
  if (!context) {
    throw new Error('useYouTube must be used within a YouTubeProvider');
  }
  return context;
};

export const YouTubeProvider = ({ children }) => {
  const [videos, setVideos] = useState(() => {
    try {
      const saved = localStorage.getItem('youtube_videos');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Video verisi yüklenirken hata:', error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('youtube_videos', JSON.stringify(videos));
  }, [videos]);

  const addVideo = (title, videoUrl, description, authorAddress) => {
    // YouTube URL'inden video ID'sini çıkar
    const videoId = videoUrl.split('v=')[1]?.split('&')[0];
    if (!videoId) throw new Error('Geçersiz YouTube linki');

    const newVideo = {
      id: Date.now().toString(),
      title,
      videoId,
      videoUrl,
      description,
      authorAddress,
      authorDisplayName: `${authorAddress.slice(0, 6)}...${authorAddress.slice(-4)}`,
      createdAt: new Date().toISOString()
    };

    setVideos(prev => [newVideo, ...prev]);
  };

  const deleteVideo = (id) => {
    setVideos(prev => prev.filter(video => video.id !== id));
  };

  const updateVideo = (id, updates) => {
    setVideos(prev => prev.map(video => 
      video.id === id ? { ...video, ...updates } : video
    ));
  };

  return (
    <YouTubeContext.Provider value={{ 
      videos, 
      addVideo, 
      deleteVideo, 
      updateVideo 
    }}>
      {children}
    </YouTubeContext.Provider>
  );
};

YouTubeProvider.propTypes = {
  children: PropTypes.node.isRequired,
}; 