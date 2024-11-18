import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [playlistUrl, setPlaylistUrl] = useState('');
  const [totalDuration, setTotalDuration] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      const playlistId = new URL(playlistUrl).searchParams.get('list');
      if (!playlistId) {
        setError('Invalid URL. Please enter a valid YouTube playlist URL.');
        return;
      }

      const response = await axios.get(`http://localhost:5000/api/playlist-length`, {
        params: { playlistId },
      });

      const formattedDuration = formatDuration(response.data.totalDuration);
      setTotalDuration(formattedDuration);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to fetch playlist length. Please try again.');
    }
  };

  // Helper function to format duration in HH:MM:SS
  const formatDuration = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="App">
      <h1>YouTube Playlist Length Calculator</h1>
      <input
        type="text"
        value={playlistUrl}
        onChange={(e) => setPlaylistUrl(e.target.value)}
        placeholder="Enter YouTube Playlist URL"
      />
      <button onClick={handleSubmit}>Calculate Length</button>
      {error && <p className="error">{error}</p>}
      {totalDuration && <p>Total Playlist Length: {totalDuration}</p>}
    </div>
  );
}

export default App;
