const extractingPlaylistsVideosData = (playlists) => {
  const playlistsData = playlists.map((playlist) => {
    return {
      ...playlist,
      videos: playlist.videos.map((video) => ({
        ...video._id,
        notes: video.notes,
      })),
    };
  });
  return playlistsData;
};

const createDefaultPlaylist = (userId) => {
  return [
    { name: "My Playlists", userId, videos: [] },
    { name: "Saved Videos", userId, videos: [] },
    { name: "Liked Videos", userId, videos: [] },
    { name: "My Notes", userId, videos: [] },
  ];
};

module.exports = { extractingPlaylistsVideosData, createDefaultPlaylist };
